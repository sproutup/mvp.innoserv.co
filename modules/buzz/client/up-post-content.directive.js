'use strict';

angular
  .module('buzz')
  .directive('upPostContent', upPostContent);

upPostContent.$inject = ['$http', 'ContentService'];

function upPostContent($http, ContentService) {
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
    scope.ContentService = ContentService;
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
    scope.ContentService.model.state = 'select';

    scope.showYouTubeVideos = function(){
      scope.vm.showYouTubeVideos(function(items){
        ContentService.model.state = 'youtube';
        scope.videos = items;
      });
    };

    function selectYouTubeVideo(video) {
      ContentService.model.selectedVideo = video;
      ContentService.model.content.media = 'yt';
      ContentService.model.content.ref = video.id.videoId;
      ContentService.model.content.title = video.snippet.title;
      ContentService.model.content.url = 'https://www.youtube.com/watch?v=' + video.id.videoId;
      ContentService.model.content.meta = {
        title: video.snippet.title,
        description: video.snippet.description
      };
      ContentService.model.state = 'write';
      scope.onChange();
    }

    function removeVideo() {
      ContentService.model.selectedVideo = {};
      ContentService.model.content = {};
      ContentService.model.state = 'select';
      scope.onChange();
    }

    scope.onChange = function(){
      ngModel.$setViewValue(scope.ContentService.model.content);
    };

    ngModel.$render = function() {
      scope.ContentService.model.content = ngModel.$modelValue;
    };
  }
}

upPostContentController.$inject = ['YouTubeService', 'ProviderService', 'Authentication', '$window', 'ContentService'];

function upPostContentController(YouTubeService, ProviderService, Authentication, $window, ContentService) {
  var vm = this;
  vm.user = Authentication.user;
  vm.load = load;
  vm.showYouTubeVideos = showYouTubeVideos;
  vm.callOauthProvider = callOauthProvider;
  vm.ContentService = ContentService;

  function load(){
    vm.providers = ProviderService.provider().query({
      userId: Authentication.user.id
    }, function() {
      var google = vm.providers.filter(function(item) {
        return item.provider === 'google';
      });
      Authentication.user.google = google[0];
    }, function(err) {
      ContentService.model.state = 'select';
      console.log(err);
    });
  }

  function showYouTubeVideos() {
    YouTubeService.videos().get({}, function(res) {
      ContentService.model.state = 'youtube';
      vm.videos = res.items;
    }, function(err) {
      ContentService.model.state = 'error';
      console.log('err here', err);
    });
  }

  function callOauthProvider(url) {
    url += '?redirect_to=' + encodeURIComponent($window.location.pathname);

    // Effectively call OAuth authentication route:
    $window.location.href = url;
  }
}
