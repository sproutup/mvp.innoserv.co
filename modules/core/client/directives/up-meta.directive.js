  'use strict';

angular
    .module('core')
    .directive('upMeta', upMeta);

function upMeta() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'modules/core/client/directives/up-meta.html',
        scope: {
            item: '=',
            url: '='
        },
        link: linkFunc,
        controller: UpMetaController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attr, ctrl) {
        // linkFunc
    }
}

function UpMetaController() {
  var vm = this;

  if (vm.url) {
    // Check for youtube and vimeo videos
    var youtubeId = getYouTubeId(vm.url);
    var vimeoId = getVimeoId(vm.url);

    // If we have a video id, set vm.videoUrl
    if (youtubeId) {
      vm.videoUrl = 'https://www.youtube.com/watch?v=' + youtubeId;
    } else if (vimeoId) {
      vm.videoUrl = 'https://www.vimeo.com/' + vimeoId;
    }
  }

  // Logic for finding a youtube or vimeo id
  function getVideoId(str, prefixes) {
    var cleaned = str.replace(/^(https?:)?\/\/(www\.)?/, '');
    for(var i = 0; i < prefixes.length; i++) {
      if (cleaned.indexOf(prefixes[i]) === 0)
        return cleaned.substr(prefixes[i].length);
    }
    return undefined;
  }

  function getYouTubeId(url) {
    return getVideoId(url, [
      'youtube.com/watch?v=',
      'youtu.be/',
      'youtube.com/embed/'
    ]);
  }

  function getVimeoId(url) {
    return getVideoId(url, [
      'vimeo.com/'
    ]);
  }
}