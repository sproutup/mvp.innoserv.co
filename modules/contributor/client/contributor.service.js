'use strict';

angular
  .module('contributor')
  .factory('ContributorService', ContributorService);

ContributorService.$inject = ['$resource'];

function ContributorService($resource){
  var user = {};

  var service = {
    contributor: contributor
  };

  return service;

  function contributor () {
    return $resource('/api/user/:userId/campaign/:campaignId', { userId:'@userId', campaignId:'@Id' }, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }
}
