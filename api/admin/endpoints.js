'use strict';
const AdminReviewActions = require('./actions');
const { searchAll, create, editById, deleteById } = new AdminReviewActions();

module.exports = (api) => {
  api.get('/admin/:userId/reviews', request => {
    return searchAll(request);
  });
  api.post('/admin/:userId/review', request => {
    return create(request);
  });
  api.put('/admin/:userId/review/:id', request => {
    return editById(request);
  });
  api.delete('/admin/:userId/review/:id', request => {
    return deleteById(request);
  });
};