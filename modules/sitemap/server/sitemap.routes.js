'use strict';

module.exports = function (app) {
  // Root routing
  var ctrl = require('./sitemap.controller');

  app.route('/robots.txt').get(ctrl.renderRobots);
  // Define error pages
  app.route('/sitemap.xml').get(ctrl.renderSitemap);
};
