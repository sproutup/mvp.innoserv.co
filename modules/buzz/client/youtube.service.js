'use strict';

angular
    .module('buzz')
    .factory('YouTubeService', YouTubeService);

YouTubeService.$inject = ['$resource'];

function YouTubeService($resource) {
  var service = {
    videos: videos
  };

  return service;

  function videos() {
    return $resource('/api/user/:userId/youtube/video', { userId:'@userId' }, { update:{ method:'PUT' } } );
  }
}
