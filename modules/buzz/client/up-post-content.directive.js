'use strict';

angular
  .module('buzz')
  .directive('upPostContent', upPostContent);

upPostContent.$inject = ['$http'];

function upPostContent($http) {
  var directive = {
    require: 'ngModel',
    scope: {
      min: '=',
      max: '=',
      ngModel: '=',
      ngDisabled: '='
    },
    controller: upPostContentController,
    controllerAs: 'vm',
    bindToController: true,
    link: linkFunc,
    templateUrl: 'modules/buzz/client/up-post-content.template.html'
  };

  return directive;

  function linkFunc(scope, element, attrs, ngModel) {
    scope.item = {
      body: '',
      media: '',
      ref: ''
    };
    ngModel.$valid = false;

    scope.selectYouTubeVideo = selectYouTubeVideo;
    scope.removeVideo = removeVideo;

    // Check which social networks you can post with
    if (attrs.networks) {
      scope.youtube = attrs.networks.indexOf('yt') > -1;
      scope.facebook = attrs.networks.indexOf('fb') > -1;
      scope.twitter = attrs.networks.indexOf('tw') > -1;
      scope.instagram = attrs.networks.indexOf('ig') > -1;
      scope.googleanalytics = attrs.networks.indexOf('ga') > -1;
      scope.url = attrs.networks.indexOf('url') > -1;
    }

    ngModel.$valid = false;
    scope.vm.contentState = 'select';

    scope.showYouTubeVideos = function(){
      scope.vm.showYouTubeVideos(function(items){
        scope.vm.contentState = 'youtube';
        scope.videos = items;
      });
    };

    function selectYouTubeVideo(video) {
      scope.selectedVideo = video;
      scope.item.media = 'yt';
      scope.item.ref = video.id.videoId;
      scope.item.title = video.snippet.title;
      scope.item.url = 'https://www.youtube.com/watch?v=' + video.id.videoId;
      scope.item.meta = {
        title: video.snippet.title,
        description: video.snippet.description
      };
      scope.vm.contentState = 'write';
      scope.onChange();
    }

    function removeVideo() {
      scope.selectedVideo = {};
      scope.item = {};
      scope.vm.contentState = 'select';
      scope.onChange();
    }

    scope.onChange = function(){
      ngModel.$setViewValue(scope.item);
    };

    ngModel.$render = function() {
      scope.item = ngModel.$modelValue;
    };
  }
}

upPostContentController.$inject = ['YouTubeService', 'ProviderService', 'Authentication', '$window'];

function upPostContentController(YouTubeService, ProviderService, Authentication, $window) {
  var vm = this;
  vm.user = Authentication.user;
  vm.load = load;
  vm.showYouTubeVideos = showYouTubeVideos;
  vm.callOauthProvider = callOauthProvider;

  function load(){
    vm.providers = ProviderService.provider().query({
      userId: Authentication.user.id
    }, function() {
      var google = vm.providers.filter(function(item) {
        return item.provider === 'google';
      });
      Authentication.user.google = google[0];
    }, function(err) {
      console.log(err);
    });
  }

  function showYouTubeVideos() {
    YouTubeService.videos().get({}, function(res) {
      vm.contentState = 'youtube';
      vm.videos = res.items;
    }, function(err) {
      vm.contentState = 'error';
      console.log('err here', err);
    });
  }

  function callOauthProvider(url) {
    url += '?redirect_to=' + encodeURIComponent($window.location.pathname);

    // Effectively call OAuth authentication route:
    $window.location.href = url;
  }
}
