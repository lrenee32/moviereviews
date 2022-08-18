/**
 * ! Import required endpoints from ./{feature-folder}/*-endpoints.js file.
 * @param {ApiBuilder} api
 */
module.exports = function (api) {
  require('./index/endpoints')(api);
  require('./admin/endpoints')(api);
  require('./authentication/endpoints')(api);
};
