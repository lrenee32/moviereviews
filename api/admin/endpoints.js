'use strict';
const AdminReviewActions = require('./actions');
const { searchAll, searchById, create, editById, deleteById } = new AdminReviewActions();

module.exports = (api) => {
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