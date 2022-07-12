'use strict';
const app = require('../app');
const AdminReviewUtils = require('./utils');
const { searchAll, create, editById, deleteById } = new AdminReviewUtils();

class ReviewActions {
  async searchAll(request) {
    const { searchTerm } = request.queryString;
    const { userId } = request.pathParams;

    try {
      const res = await searchAll(userId, searchTerm);
      return res;
    } catch (err) {
      console.warn(`Error getting reviews: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
  async create(request) {
    const item = request.body;
    const { userId } = request.pathParams;

    try {
      const res = await create(userId, item);
      return res;
    } catch (err) {
      console.warn(`Error creating review: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
  async editById(request) {
    const { userId, id } = request.pathParams;
    const item = request.body;

    try {
      const res = await editById(userId, id, item);
      return res;
    } catch (err) {
      console.warn(`Error creating review: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
  async deleteById(request) {
    const { userId, id } = request.pathParams;

    try {
      const res = await deleteById(userId, id);
      return res;
    } catch (err) {
      console.warn(`Error creating review: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
};

module.exports = ReviewActions;