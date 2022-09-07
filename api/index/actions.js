'use strict';
const app = require('../app');
const EntryUtils = require('./utils');
const { search, searchById } = new EntryUtils();

class EntryActions {
  async search(request) {
    try {
      const res = await search(request.queryString);
      return res;
    } catch (err) {
      console.warn(`Error getting entries: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async searchById(request) {
    const { EntryId } = request.pathParams;
    
    try {
      return await searchById(EntryId);
    } catch (err) {
      console.warn(`Error getting entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    }
  };
};

module.exports = EntryActions;