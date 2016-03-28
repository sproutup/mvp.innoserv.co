'use strict';

angular
  .module('campaign')
  .factory('CampaignService', CampaignService);

CampaignService.$inject = ['$resource', '$q'];

function CampaignService($resource, $q){
  var user = {};

  var service = {
    campaign: campaign,
    campaignSingle: campaignSingle,
    listByUser: listByUser,
    getUserActivities: getUserActivities,
    listByCompany: listByCompany,
    contributor: contributor,
    listMyContributions: listMyContributions
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
}
