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
    return $resource('/api/me/youtube/video', {}, { update:{ method:'PUT' } } );
  }
}
