'use strict';
const app = require('../app');
const AdminEntryUtils = require('./utils');
const { search, searchById, create, editById, deleteById } = new AdminEntryUtils();

class EntryActions {
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

  async revalidate(request) {
    const { UserId } = request.pathParams;
    
    try {
      if (UserId === 'a5c723d5-89ba-4554-a09d-ee3870be41a3') {
        await app.ApiResponse.revalidate(`http://localhost:3000/admin/${UserId}`);
        return { revalidated: true };
      }
    } catch (err) {
      console.warn(`Error revalidating: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    }
  };
};

module.exports = EntryActions;