'use strict';
const app = require('../app');
const MessageUtils = require('./utils');
const { createMessage } = new MessageUtils();

class MessageActions {
  async createMessage(request) {
    const { name, email, message } = request.body;

    try {
      const res = await createMessage(name, email, message);
      return res;
    } catch (err) {
      console.warn(`Error creating email: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
};

module.exports = MessageActions;