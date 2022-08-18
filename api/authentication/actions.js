'use strict';
const app = require('../app');
const AuthenticationUtils = require('./utils');
const { authenticate, authenticated, logout } = new AuthenticationUtils();

class AuthenticationActions {
  async authenticate(request) {
    const { email, password } = request.body;

    try {
      const res = await authenticate(email, password);
      return res;
    } catch (err) {
      console.warn(`Error authenticating user: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async authenticated(request) {
    const token = request.headers.authorization;

    try {
      const res = await authenticated(token);
      return res;
    } catch (err) {
      console.warn(`Error checking authentication: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async logout(request) {
    const { email } = request.body;

    try {
      const res = await logout(email);
      return res;
    } catch (err) {
      console.warn(`Error logging out: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
};

module.exports = AuthenticationActions;