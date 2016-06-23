'use strict';

module.exports = function (app) {
  // Root routing
  var ctrl = require('./sitemap.controller');

  // Define error pages
  app.route('/sitemap.xml').get(ctrl.renderSitemap);
};
