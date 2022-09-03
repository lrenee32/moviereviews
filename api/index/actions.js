'use strict';
const app = require('../app');
const EntryUtils = require('./utils');
const { search, searchById } = new EntryUtils();

class EntryActions {
  async search(request) {
    const { SearchTerm, EntryType, Sort } = request.queryString;

    try {
      const res = await search(SearchTerm, EntryType, Sort);
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