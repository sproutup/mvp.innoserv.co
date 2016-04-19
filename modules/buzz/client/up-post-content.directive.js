'use strict';

angular
  .module('buzz')
  .directive('upPostContent', upPostContent);

upPostContent.$inject = ['$http', 'ContentService'];

function upPostContent($http, ContentService) {
  var directive = {
    controller: upPostContentController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      group: '@'
    },
    link: linkFunc,
    templateUrl: 'modules/buzz/client/up-post-content.template.html'
  };

  return directive;

  function linkFunc(scope, element, attrs) {
    scope.ContentService = ContentService;

    // Check which social networks you can post with
    if (attrs.networks) {
      scope.youtube = attrs.networks.indexOf('yt') > -1;
      scope.facebook = attrs.networks.indexOf('fb') > -1;
      scope.twitter = attrs.networks.indexOf('tw') > -1;
      scope.instagram = attrs.networks.indexOf('ig') > -1;
      scope.googleanalytics = attrs.networks.indexOf('ga') > -1;
      scope.url = attrs.networks.indexOf('url') > -1;
    }

    scope.showYouTubeVideos = function(){
      scope.vm.showYouTubeVideos(function(items){
        ContentService.model.state = 'youtube';
        scope.videos = items;
      });
    };
  }
}

upPostContentController.$inject = ['YouTubeService', 'ProviderService', 'Authentication', '$window', 'ContentService', 'PostService', 'FeedService', 'usSpinnerService', '$state'];

function upPostContentController(YouTubeService, ProviderService, Authentication, $window, ContentService, PostService, FeedService, usSpinnerService, $state) {
  var vm = this;
  vm.item = {};
  vm.user = Authentication.user;
  vm.load = load;
  vm.create = create;
  vm.showYouTubeVideos = showYouTubeVideos;
  vm.callOauthProvider = callOauthProvider;
  vm.ContentService = ContentService;
  vm.selectYouTubeVideo = selectYouTubeVideo;
  vm.removeVideo = removeVideo;
  // usSpinnerService.spin('spinner-4');

  function load(){
    vm.providers = ProviderService.provider().query({
      userId: Authentication.user.id
    }, function() {
      vm.state = 'select';
      var google = vm.providers.filter(function(item) {
        return item.provider === 'google';
      });
      Authentication.user.google = google[0];
    }, function(err) {
      vm.state = 'select';
      console.log(err);
    });
  }

  function showYouTubeVideos() {
    vm.fetchingYouTube = true;
    YouTubeService.videos().get({}, function(res) {
      vm.fetchingYouTube = false;
      if (res.statusCode) {
        vm.state = 'error';
      } else {
        vm.state = 'youtube';
        vm.videos = res.items;
      }
    }, function(err) {
      vm.fetchingYouTube = false;
      vm.state = 'error';
    });
  }

  function selectYouTubeVideo(video) {
    vm.selectedVideo = video;
    vm.item.media = 'yt';
    vm.item.ref = video.id.videoId;
    vm.item.title = video.snippet.title;
    vm.item.url = 'https://www.youtube.com/watch?v=' + video.id.videoId;
    vm.item.meta = {
      title: video.snippet.title,
      description: video.snippet.description
    };
    vm.state = 'write';
  }

  function callOauthProvider(url) {
    url += '?redirect_to=' + encodeURIComponent($window.location.pathname);

    // Effectively call OAuth authentication route:
    $window.location.href = url;
  }

  function create() {
    vm.posting = true;
    vm.item.userId = vm.user.id;
    var Post = PostService.post();
    var item = new Post({
      body: vm.item.body,
      url: vm.item.url,
      meta: vm.item.meta,
      groupId: vm.group
    });

    // Add youtube link to the body
    if (vm.item.ref && vm.item.media === 'yt') {
      item.body = 'https://www.youtube.com/watch?v=' + vm.item.ref + '\n' + vm.item.body;
    }

    usSpinnerService.spin('spinner-1');

    item.$save(function(res) {
      saveContent();
      vm.posting = false;
      vm.item = {};
      vm.selectedVideo = {};
      vm.state = 'select';
      FeedService.model.posts.unshift(res);
      usSpinnerService.stop('spinner-1');
    }, function(err) {
      vm.posting = false;
      usSpinnerService.stop('spinner-1');
    });
  }

  function saveContent() {
    var Content = ContentService.content();
    var contentItem = new Content({
      media: vm.item.media,
      ref: vm.item.ref,
      campaignId: $state.params.campaignId,
      title: vm.item.title
    });

    contentItem.$save();
  }

  function removeVideo() {
    vm.selectedVideo = {};
    vm.item.media = null;
    vm.item.url = null;
    vm.item.ref = null;
    vm.item.title = null;
    vm.item.meta = null;
    vm.state = 'select';
  }
}
