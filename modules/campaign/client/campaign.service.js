'use strict';

angular
  .module('campaign')
  .factory('CampaignService', CampaignService);

CampaignService.$inject = ['$resource'];

function CampaignService($resource){
  var user = {};

  var service = {
    campaign: campaign,
    campaignSingle: campaignSingle,
    listByUser: listByUser,
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
    return $resource('/api/user/:userId/campaign', { userId:'@id' }, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
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
