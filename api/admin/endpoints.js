'use strict';
const AdminEntryActions = require('./actions');
const { search, searchById, create, editById, deleteById, revalidate } = new AdminEntryActions();

module.exports = (api) => {
  api.get('/admin/:UserId/entries', request => {
    return search(request);
  });
  
  api.get('/admin/:UserId/entry/:EntryId', request => {
    return searchById(request);
  });

  api.post('/admin/:UserId/entry/create', request => {
    return create(request);
  });

  api.put('/admin/:UserId/entry/edit/:EntryId', request => {
    return editById(request);
  });

  api.delete('/admin/:UserId/entry/delete/:EntryId', request => {
    return deleteById(request);
  });

  api.get('/admin/:UserId/revalidate', request => {
    return revalidate(request);
  });
};