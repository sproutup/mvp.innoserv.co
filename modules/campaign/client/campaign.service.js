'use strict';

angular
  .module('campaign')
  .factory('CampaignService', CampaignService);

CampaignService.$inject = ['$resource', '$q', 'lodash'];

function CampaignService($resource, $q, _){
  var user = {};

  var service = {
    campaign: campaign,
    campaignSingle: campaignSingle,
    listByUser: listByUser,
    getUserActivities: getUserActivities,
    listByCompany: listByCompany,
    contributor: contributor,
    listMyContributions: listMyContributions,
    pickRandoms: pickRandoms
  };

  activate();

  return service;

  function activate() {
    console.log('creator service - activated');
  }

  function campaign () {
    return $resource('/api/campaign/:campaignId', { campaignId:'@id' }, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function listByUser () {
    return $resource('/api/user/:userId/campaign', { 'query': {method:'GET', isArray:true} });
  }

  function getUserActivities(userId) {
    var defer = $q.defer();
    var promise = defer.promise;

    listByUser().query({
      userId: userId
    }, function(response) {
      return defer.resolve(response);
    }, function(errorResponse) {
      return defer.reject(errorResponse);
    });

    return promise;
  }

  function listByCompany () {
    return $resource('/api/company/:companyId/campaign', { companyId:'@id' }, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function contributor () {
    return $resource('/api/contributor', { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function campaignSingle () {
    return $resource('/api/campaign/:campaignId/user/:userId', { userId:'@id', campaignId: '@campaignId' }, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function listMyContributions () {
    return $resource('/api/user/:userId/campaign', { userId:'@id' }, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function pickRandoms(number, array) {
    if (number > array.length) {
      return array;
    }

    return _.shuffle(array).slice(0, number);
  }
}
