'use strict';
const AuthenticationActions = require('./actions');
const { authenticate, authenticated, logout } = new AuthenticationActions();

module.exports = (api) => {
  api.post('/admin/authenticate', request => {
    return authenticate(request);
  });

  api.post('/admin/authenticated', request => {
    return authenticated(request);
  });

  api.post('/admin/logout', request => {
    return logout(request);
  });
};