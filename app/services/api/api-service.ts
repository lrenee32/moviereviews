const baseUrl = 'http://localhost:5000';

type APIMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "CONNECT";

interface FetchOptions {
  method: APIMethod,
  headers?: any | null,
  body?: any | null,
}

export interface APIRequest extends FetchOptions {
  path: string,
  params?: URLSearchParams,
};

export const API = async (request: APIRequest) => {
  console.log(request.body);
  const url = new URL(baseUrl + request.path);
  if (request.params) {
    request.params.forEach((val, key) => url.searchParams.append(key, val));
  }
  return fetch(url, {
    method: request.method,
    headers: request.headers,
    body: JSON.stringify(request.body),
  })
    .then(res => res.json());
};