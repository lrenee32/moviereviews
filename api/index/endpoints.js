'use strict';
const ReviewActions = require('./actions');
const { search, searchById } = new ReviewActions();

module.exports = (api) => {
  api.get('/reviews', request => {
    return search(request);
  });

  api.get('/review/:ReviewId', request => {
    return searchById(request);
  });
};