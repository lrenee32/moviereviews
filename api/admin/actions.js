'use strict';
const app = require('../app');
const AdminReviewUtils = require('./utils');
const { search, searchById, create, editById, deleteById } = new AdminReviewUtils();

class ReviewActions {
  async search(request) {
    const { searchTerm } = request.queryString;

    try {
      const res = await search(searchTerm);
      return res;
    } catch (err) {
      console.warn(`Error getting reviews: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async searchById(request) {
    const { reviewId } = request.pathParams;
    
    try {
      return await searchById(reviewId);
    } catch (err) {
      console.warn(`Error getting review: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    }
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
    const { userId, reviewId } = request.pathParams;
    const item = request.body;

    try {
      const res = await editById(userId, reviewId, item);
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