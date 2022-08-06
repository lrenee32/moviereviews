'use strict';
const app = require('../app');
const AdminEntryUtils = require('./utils');
const { search, searchById, create, editById, deleteById } = new AdminEntryUtils();

class AdminEntryActions {
  async search(request) {
    const { SearchTerm } = request.queryString;

    try {
      const res = await search(SearchTerm);
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

  async create(request) {
    const Item = request.body;
    const { UserId } = request.pathParams;

    try {
      const res = await create(UserId, Item);
      return res;
    } catch (err) {
      console.warn(`Error creating entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async editById(request) {
    const { UserId, EntryId } = request.pathParams;
    const Item = request.body;

    try {
      const res = await editById(UserId, EntryId, Item);
      return res;
    } catch (err) {
      console.warn(`Error creating entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async deleteById(request) {
    const { UserId, EntryId } = request.pathParams;

    try {
      const res = await deleteById(UserId, EntryId);
      return res;
    } catch (err) {
      console.warn(`Error creating entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
};

module.exports = AdminEntryActions;