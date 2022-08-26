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

function getExpiration(token) {
  const jwtPayload = token.split('.')[1];
  return JSON.parse(Buffer.from(jwtPayload, 'base64')).exp;
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
      const res = await Cognito.adminInitiateAuth(params).promise();
      return res.AuthenticationResult;
    } catch (err) {
      throw new Error(err || err.message);
    };
  };

  async authenticated(token) {
    try {
      return isValid(token);
    } catch (err) {
      throw new Error(err || err.message);
    };
  };

  async logout(email) {
    try {
      const params = {
        UserPoolId: process.env.CognitoPoolId,
        Username: email,
      };
      const res = await Cognito.adminUserGlobalSignOut(params).promise();
      return res;
    } catch (err) {
      throw new Error(err || err.message);
    };
  };
}

module.exports = AuthenticationUtils;