'use strict';
const app = require('../app');
const ReviewUtils = require('./utils');
const { search, searchById } = new ReviewUtils();

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
    const { id } = request.pathParams;
    
    try {
      return await searchById(id);
    } catch (err) {
      console.warn(`Error getting review: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    }
  };
};

module.exports = ReviewActions;