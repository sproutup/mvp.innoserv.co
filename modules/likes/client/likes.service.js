'use strict';
// factory
angular
  .module('likes')
  .factory('LikesService', likesService);

likesService.$inject = ['$http','$log','$q',];

function likesService($http, $log, $q) {
  var urlBase = '/api/likes';
  var LikesService = {};

  LikesService.getLikes = function(refId, refType){
    return $http({
        method: 'GET',
        url: urlBase + '/' + refType + '/' + refId,
      });
    };

  LikesService.addLike = function(refId, refType){
    var deferred = $q.defer();
    $http({
        method: 'POST',
        url: urlBase,
        data: {
          refType: refType,
          refId: refId
        },
        headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
        deferred.resolve(data);
    }).error(function(data, status, headers, config) {
        deferred.reject();
    });

    return deferred.promise;
  };

  LikesService.deleteLike = function(id){
    var deferred = $q.defer();
    $http({
        method: 'DELETE',
        url: urlBase + '/' + id,
        data: '{}',
        headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
        console.log(data);
        deferred.resolve(data);
    }).error(function(data, status, headers, config) {
        deferred.reject();
    });

    return deferred.promise;
  };

  return LikesService;

}

