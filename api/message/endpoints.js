'use strict';
const MessageActions = require('./actions');
const { createMessage } = new MessageActions();

module.exports = (api) => {
  api.post('/message/create', request => {
    return createMessage(request);
  });
};