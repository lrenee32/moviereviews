'use strict'
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

class Database {
  query(params) {
    return dynamodb.query(params).promise();
  };
  put(params) {
    return dynamodb.put(params).promise();
  };
  update(params) {
    return dynamodb.update(params).promise();
  };
  delete(params) {
    return dynamodb.delete(params).promise();
  };
  scan(params) {
    return dynamodb.scan(params).promise();
  };
};

module.exports = Database;