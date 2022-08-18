'use strict'
const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()

module.exports = api

require('./register.js')(api)

api.registerAuthorizer('CognitoAuthorizer', {
  providerARNs: [process.env.CognitoPoolARN],
})