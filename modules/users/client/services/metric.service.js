'use strict';

angular
  .module('users')
  .factory('MetricService', MetricService);

MetricService.$inject = ['$resource', '$http', '$q', '$filter'];

function MetricService($resource, $http, $q, $filter) {
  var service = {
    metrics: metrics
  };

  return service;

  function metrics() {
    return $resource('api/user/:userId/service/metrics', {userId:'@userId'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }
}
