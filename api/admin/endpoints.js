'use strict';
const AdminEntryActions = require('./actions');
const { search, searchById, create, presign, editById, deleteById } = new AdminEntryActions();

module.exports = (api) => {
  api.get('/admin/:UserId/entries', request => {
    return search(request);
  });
  
  api.get('/admin/:UserId/entry/:EntryId', request => {
    return searchById(request);
  });

  api.post('/admin/:UserId/entry/create/:EntryId', request => {
    return create(request);
  });

  api.post('/admin/:UserId/entry/presign/:EntryId', request => {
    return presign(request);
  });

  api.put('/admin/:UserId/entry/edit/:EntryId', request => {
    return editById(request);
  });

  api.delete('/admin/:UserId/entry/delete/:EntryId', request => {
    return deleteById(request);
  });
};