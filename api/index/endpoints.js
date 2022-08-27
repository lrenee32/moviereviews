'use strict';
const ReviewActions = require('./actions');
const { search, searchById } = new ReviewActions();

module.exports = (api) => {
  api.get('/entries', request => {
    return search(request);
  });

  api.get('/entry/{EntryId}', request => {
    return searchById(request);
  });
};