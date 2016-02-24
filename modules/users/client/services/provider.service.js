'use strict';

angular
  .module('users')
  .factory('ProviderService', ProviderService);

ProviderService.$inject = ['$resource', '$http', '$q', '$filter'];

function ProviderService($resource, $http, $q, $filter) {
  var service = {
    provider: providerApi
  };

  return service;

  function providerApi () {
    return $resource('/api/user/:userId/provider', {userId:'@userId'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }
}
