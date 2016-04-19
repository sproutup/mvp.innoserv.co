'use strict';

angular
  .module('buzz')
  .factory('FeedService', FeedService);

FeedService.$inject = ['$resource', '$q'];

function FeedService($resource, $q){
  var model = {
    posts: []
  };

  var service = {
    model: model,
    buzzAll: buzzAll,
    buzzGroup: buzzGroup,
    buzzSingle: buzzSingle,
    buzzUser: buzzUser,
    getUserBuzz: getUserBuzz
  };

  return service;

  function buzzAll() {
    return $resource('/api/post/timeline/all/:start', {start:'@start'}, {update:{method:'PUT'}} );
  }

  function buzzGroup() {
    return $resource('/api/post/timeline/group/:groupId/:start', {groupId:'@groupId', start:'@start'}, {update:{method:'PUT'}} );
  }

  function buzzSingle() {
    return $resource('/api/post/:id', {id:'@id'}, {update:{method:'PUT'}});
  }

  function buzzUser() {
    return $resource('/api/post/timeline/user/:userId/:start');
  }

  function getUserBuzz(userId, start) {
    var defer = $q.defer();
    var promise = defer.promise;

    buzzUser().query({
      userId: userId,
      start: start
    }, function(response) {
      return defer.resolve(response);
    }, function(errorResponse) {
      return defer.reject(errorResponse);
    });

    return promise;
  }

}
