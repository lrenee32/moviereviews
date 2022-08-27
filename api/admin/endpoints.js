'use strict';
const AdminEntryActions = require('./actions');
const { search, searchById, create, presign, editById, deleteById, deleteImages } = new AdminEntryActions();

module.exports = (api) => {
  api.get('/admin/{UserId}/entries', request => {
    return search(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });
  
  api.get('/admin/{UserId}/entry/{EntryId}', request => {
    return searchById(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });

  api.post('/admin/{UserId}/entry/create/{EntryId}', request => {
    return create(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });

  api.post('/admin/{UserId}/entry/presign/{EntryId}', request => {
    return presign(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });

  api.put('/admin/{UserId}/entry/edit/{EntryId}', request => {
    return editById(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });

  api.delete('/admin/{UserId}/entry/delete/{EntryId}', request => {
    return deleteById(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });

  api.delete('/admin/{UserId}/entry/delete/image/{EntryId}', request => {
    return deleteImages(request);
  }, { cognitoAuthorizer: 'CognitoAuthorizer' });
};