'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.CognitoPoolRegion });
const Cognito = new AWS.CognitoIdentityServiceProvider();

function isValid(token) {
  const now = Math.floor(new Date() / 1000);
  if (token) {
    return now < getExpiration(token);
  }
  return false;
};

class AuthenticationUtils {
  async authenticate(email, password) {
    try {
      const params = {
        AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
        ClientId: process.env.CognitoPoolClientId,
        UserPoolId: process.env.CognitoPoolId,
      };
      const res = await Cognito.adminInitiateAuth(params);
      return res.data;
    } catch (err) {
      return err || err.message;
    };
  };

  async authenticated(token) {
    try {
      return isValid(token);
    } catch (err) {
      return err || err.message;
    };
  };

  async logoout(email) {
    try {
      const params = {
        UserPoolId: process.env.CognitoPoolClientId,
        Username: email,
      };
      const res = await Cognito.adminUserGlobalSignOut(params);
      return res;
    } catch (err) {
      return err || err.message;
    };
  };
}

module.exports = AuthenticationUtils;