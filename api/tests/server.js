'use strict'

const express = require('express');
const server = express();
const cors = require('cors');
const pathParser = require('path-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = require('../app');
const path = app.apiConfig().routes;
const routes = getRoutes(path);
const options = {
  port: 5000,
};

function parseContentHandling(params) {
  const requestContext = params.requestContext;
  // path in API Config is indexed without the leading slash
  const apiPath = requestContext.resourcePath.slice(1);
  const httpMethod = requestContext.httpMethod;

  if (routes &&
    routes[apiPath] &&
    routes[apiPath][httpMethod] &&
    routes[apiPath][httpMethod].success) {
    return routes[apiPath][httpMethod].success.contentHandling;
  }
  return false;
}

function parseQueryString(query) {
  Object.keys(query).forEach(key => {
    if (typeof query[key] === 'object' && query[key] !== null) {
      Object.keys(query[key]).forEach(i => {
        query[`${key}[${i}]`] = query[key][i];
      });
      delete query[key];
    }
  });
  return query;
}

function getRoutes() {
  const routePaths = Object.keys(path);

  return routePaths.map((routePath) => {
    const supportedMethods = Object.keys(path[routePath] || {});
    const route = `/${routePath}`;
    return {
      resourcePath: route,
      supportedMethods,
      path: pathParser.Path.createPath(route.replace(/{(.+?)}/g, ':$1'))
    };
  });
}

function getPathParams(req) {
  const parsedPath = req._parsedUrl.pathname;
  for (const route of routes) {
    const isSupported = route.supportedMethods.indexOf(req.method) !== -1;
    const pathParameters = route.path.test(parsedPath);
    if (isSupported && pathParameters) {
      return {
        resourcePath: route.resourcePath,
        pathParameters
      };
    }
  }

  return {
    resourcePath: parsedPath,
    pathParameters: {}
  };
}

function getParams(req) {
  const pathParams = getPathParams(req);

  return {
    requestContext: {
      resourcePath: pathParams.resourcePath,
      httpMethod: req.method
    },
    headers: req.headers,
    queryStringParameters: parseQueryString(req.query),
    body: req.body,
    pathParameters: pathParams.pathParameters
  };
}

function handleResponse(res, convertToBinary) {
  return (err, response) => {
    if (err) {
      const body = {
        message: err,
      };
      return res
        .status(500)
        .send(body);
    }
    if (convertToBinary === 'CONVERT_TO_BINARY') {
      return res
        .set(response.headers || {})
        .status(response.statusCode || 200)
        .send(response.body ? Buffer.from(response.body, 'base64') : undefined)
    }
    return res
      .set(response.headers || {})
      .status(response.statusCode || 200)
      .send(response.body || {});
  }
}

function handleRequest() {
  return (req, res) => {
    const params = getParams(req);

    const convertToBinary = parseContentHandling(params);
    app.proxyRouter(params, {
      done: handleResponse(res, convertToBinary),
    });
  };
}

function init() {
  server.use(cors({ origin: '*' }));
  server.use(express.json());
  server.use(express.urlencoded());
  server.all('*', handleRequest());
  server.listen(options.port, () => {
    console.log(`Server is running on port ${options.port}.`);
  });
}

init();