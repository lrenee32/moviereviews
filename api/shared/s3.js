'use strict'
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-east-1' });

class S3 {
  query(params) {
    return s3.getObject(params).promise();
  };
  put(params) {
    return s3.putObject(params).promise();
  };
  delete(params) {
    return s3.deleteObject(params).promise();
  };
  presign(action, params) {
    return s3.getSignedUrl(action, params);
  };
};

module.exports = S3;