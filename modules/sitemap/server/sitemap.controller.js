'use strict';

/**
 * Module dependencies.
 */
var sm = require('sitemap');
var _ = require('lodash');
var config = require('config/config');
var dynamoose = require('dynamoose');
//var cache = require('config/lib/cache');
var debug = require('debug')('up:debug:sitemap:ctrl');
var request = require('request-promise');

/**
 * Render the main application page
 */
exports.renderRobots = function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send('User-agent: * \nDisallow:');
};


/**
 * Sitemap
 */
exports.renderSitemap = function (req, res) {
  var sitemap = sm.createSitemap ({
    hostname: 'https://www.sproutup.co',
    cacheTime: 600000
  });

  var options = {
    uri: config.server.api + '/api/slug',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  sitemap.add({url: '/buzz/'});
  sitemap.add({url: '/discover', changefreq: 'daily'});
  sitemap.add({url: '/hangout/list', changefreq: 'daily'});
  sitemap.add({url: '/authentication/signin', changefreq: 'daily'});

  sitemap.add({url: '/how', changefreq: 'monthly'});
  sitemap.add({url: '/team', changefreq: 'monthly'});
  sitemap.add({url: '/terms', changefreq: 'monthly'});
  sitemap.add({url: '/privacy', changefreq: 'monthly'});

  request(options).then(function (body) {
    _.forEach(body, function(value){
      sitemap.add({
        url: '/' + value.id,
        changefreq: 'daily'
      });
    });
    return body;
  }).then(function(){
    res.header('Content-Type', 'application/xml');
    res.send( sitemap.toString() );
  }).catch(function(err){
    console.log('sitemap query failed: ', err);
  });
};

