'use strict';

/**
 * Module dependencies.
 */
var sm = require('sitemap');
var dynamoose = require('dynamoose');
//var cache = require('config/lib/cache');
var debug = require('debug')('up:debug:sitemap:ctrl');

/**
 * Sitemap
 */
exports.renderSitemap = function (req, res) {
  var sitemap = sm.createSitemap ({
        hostname: 'https://www.sproutup.co',
        cacheTime: 600000
      });

  sitemap.add({url: '/buzz/'});
  sitemap.add({url: '/discover', changefreq: 'daily'});
  sitemap.add({url: '/hangout/list', changefreq: 'daily'});
  sitemap.add({url: '/authentication/signin', changefreq: 'daily'});

  sitemap.add({url: '/how', changefreq: 'monthly'});
  sitemap.add({url: '/team', changefreq: 'monthly'});
  sitemap.add({url: '/terms', changefreq: 'monthly'});
  sitemap.add({url: '/privacy', changefreq: 'monthly'});

  res.header('Content-Type', 'application/xml');
  res.send( sitemap.toString() );
};

