'use strict';
const app = require('../app');
const AdminEntryUtils = require('./utils');
const { search, searchById, create, presign, editById, deleteById, deleteImages } = new AdminEntryUtils();

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
    const { UserId, EntryId } = request.pathParams;
    const Item = request.body;

    try {
      const res = await create(UserId, EntryId, Item);
      return res;
    } catch (err) {
      console.warn(`Error creating entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async presign(request) {
    const { FileName } = request.queryString;
    const { UserId, EntryId } = request.pathParams;

    try {
      const res = await presign(UserId, EntryId, FileName);
      return res;
    } catch (err) {
      console.warn(`Error creating presigned url: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  }

  async editById(request) {
    const { UserId, EntryId } = request.pathParams;
    const Item = request.body;

    try {
      const res = await editById(UserId, EntryId, Item);
      return res;
    } catch (err) {
      console.warn(`Error editing entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async deleteById(request) {
    const { UserId, EntryId } = request.pathParams;
    const Items = request.body;

    try {
      const res = await deleteById(UserId, EntryId, Items);
      return res;
    } catch (err) {
      console.warn(`Error deleting entry: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };

  async deleteImages(request) {
    const Items = request.body;

    try {
      const res = await deleteImages(Items);
      return res;
    } catch (err) {
      console.warn(`Error deleting entry images: ${err}`);
      return new app.ApiResponse(err.message, {}, 500);
    };
  };
};

module.exports = AdminEntryActions;