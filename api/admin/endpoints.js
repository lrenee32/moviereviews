'use strict';
const AdminReviewActions = require('./actions');
const { search, searchById, create, editById, deleteById } = new AdminReviewActions();

module.exports = (api) => {
  api.get('/admin/:userId/reviews', request => {
    return search(request);
  });
  
  api.get('/admin/:userId/review/:reviewId', request => {
    return searchById(request);
  });

  api.post('/admin/:userId/review/create', request => {
    return create(request);
  });

  api.put('/admin/:userId/review/edit/:reviewId', request => {
    return editById(request);
  });

  api.delete('/admin/:userId/review/:reviewId', request => {
    return deleteById(request);
  });
};