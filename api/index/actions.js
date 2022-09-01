'use strict';
const app = require('../app');
const EntryUtils = require('./utils');
const { search, searchById } = new EntryUtils();

class EntryActions {
  async search(request) {
    const { SearchTerm, EntryType } = request.queryString;

    try {
      const res = await search(SearchTerm, EntryType);
      return res;
    } catch (err) {
      console.warn(`Error getting entries: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async searchById(request) {
    const { PK } = request.pathParams;
    
    try {
      return await searchById(PK);
    } catch (err) {
      console.warn(`Error getting entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    }
  };
};

module.exports = EntryActions;