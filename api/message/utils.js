'use strict';
const AWS = require('aws-sdk');
const SES = new AWS.SES();

function generateParams(name, email, message) {
  return {
    Source: process.env.SiteEmail,
    Destination: { ToAddresses: [process.env.SiteEmail] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Message sent from email ${email} by ${name} \nContent: ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Message received from ${process.env.S3Bucket}`,
      },
    },
  };
};

class MessageUtils {
  async createMessage(name, email, message) {
    try {
      const params = generateParams(name, email, message);
      const res = await SES.sendEmail(params).promise();
      return res;
    } catch (err) {
      throw new Error(err);
    };
  };
}

module.exports = MessageUtils;