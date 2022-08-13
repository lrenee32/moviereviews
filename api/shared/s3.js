'use strict'
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-east-1' });

class S3 {
  listObjects(params) {
    return s3.listObjectsV2(params).promise();
  };
  put(params) {
    return s3.putObject(params).promise();
  };
  deleteObject(params) {
    return s3.deleteObject(params).promise();
  };
  deleteObjects(params) {
    return s3.deleteObjects(params).promise();
  };
  presign(action, params) {
    return s3.getSignedUrl(action, params);
  };
};

module.exports = S3;