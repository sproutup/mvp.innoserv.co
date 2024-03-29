(function () {
    'use strict';

angular
    .module('buzz')
    .controller('BuzzController', BuzzController);

// This controller contains logic for main buzz page as well as individual product buzz pages
// Functions loadInit and loadMore have seperate queries for when a slug is present (product buzz page) vs. when there is no slug (main buzz page)

BuzzController.$inject = ['$stateParams', '$state', 'FeedService', 'ContentService', 'Authentication', '$rootScope', '$scope', 'PostService', '$timeout', 'usSpinnerService', 'SuggestService', 'CampaignService', 'HangoutService'];

function BuzzController($stateParams, $state, FeedService, ContentService, Authentication, $rootScope, $scope, PostService, $timeout, usSpinnerService, SuggestService, CampaignService, HangoutService) {
    var vm = this;
    var content = [];
    vm.FeedService = FeedService;
    vm.myTrialProducts = [];
    vm.ContentService = ContentService;
    vm.ContentService = ContentService;
    vm.loadContent = loadContent;
    vm.loadGroupContent = loadGroupContent;
    vm.slug = $stateParams.slug;
    vm.addContent = addContent;
    vm.displayLinkInput = displayLinkInput;
    vm.displayLinkPhoto = displayLinkPhoto;
    vm.displayLinkVideo = displayLinkVideo;
    vm.selectTrialProduct = selectTrialProduct;
    vm.busy = false;
    vm.disabled = false;
    var local = {};
    local.loadCallback = loadCallback;
    local.displayYoutubeVideo = displayYoutubeVideo;
    local.displayTweet = displayTweet;
    local.optimizeContentDisplay = local.optimizeContentDisplay;
    var position = 0;
    vm.create = create;
    vm.createContent = createContent;
    vm.list = list;
    vm.findCampaigns = findCampaigns;
    vm.findHangouts = findHangouts;
    vm.post = {
        body: ''
    };

    vm.contentObj = {
        body: ''
    };

    vm.suggestion = {
        body: ''
    };

    $rootScope.sharing = false;
    vm.user = Authentication.user;

    function list() {
        PostService.post().query(function(res) {
            vm.content = res;
        });
    }

    function loadContent() {
        console.log('load buzz: ', position);
        vm.busy = true;
        if (vm.slug) {
            content = FeedService.buzzProduct().query({
                slug: vm.slug,
                start: position
            }, function() {
                loadCallback(content);
            });
        } else if ($stateParams.nickname) {
            content = FeedService.buzzUser().query({
                nickname: $stateParams.nickname,
                start: position
            }, function() {
                loadCallback(content);
            });
        } else if ($stateParams.id) {
            vm.content = FeedService.buzzSingle().get({
                id: $stateParams.id
            }, function() {
                if (vm.content.content) {
                    displayYoutubeVideo(vm.content.content);
                    displayTweet(vm.content.content);
                }
                // Get twitter handle of the product for twitter share
                if (vm.content.product && vm.content.product.urlTwitter) {
                    var index = vm.content.product.urlTwitter.indexOf('twitter.com/');
                    vm.content.product.twitterHandle = vm.content.product.urlTwitter.substring((index + 12), vm.content.product.urlTwitter.length);
                }

                // Set the twitter share info based on whether or not the user and product have twitter handles
                if (vm.content.user && vm.content.user.handleTwitter && vm.content.product.urlTwitter) {
                    vm.content.tweetContentLink = 'https://twitter.com/intent/tweet' +
                                                  '?text=Check out @' + vm.content.user.handleTwitter + '\'s post about @' + vm.content.product.twitterHandle +
                                                  ' on @sproutupco—http://sproutup.co/buzz/' + vm.content.id;
                } else if (vm.content.user && vm.content.user.handleTwitter) {
                    vm.content.tweetContentLink = 'https://twitter.com/intent/tweet' +
                                                  '?text=Check out @' + vm.content.user.handleTwitter + '\'s post about ' + vm.content.product.name +
                                                  ' on @sproutupco—http://sproutup.co/buzz/' + vm.content.id;
                } else if (vm.content.user && vm.content.product.urlTwitter) {
                    vm.content.tweetContentLink = 'https://twitter.com/intent/tweet' +
                                                  '?text=Check out ' + vm.content.user.name + '\'s post about @' + vm.content.product.twitterHandle +
                                                  ' on @sproutupco—http://sproutup.co/buzz/' + vm.content.id;
                } else if (vm.content.user) {
                    vm.content.tweetContentLink = 'https://twitter.com/intent/tweet' +
                                                  '?text=Check out ' + vm.content.user.name + '\'s post about ' + vm.content.product.name +
                                                  ' on @sproutupco—http://sproutup.co/buzz/' + vm.content.id;
                }
            });
        } else {
            content = FeedService.buzzAll().query({
                start: position
            }, function() {
                loadCallback(content);
            });
        }
    }

    function loadGroupContent(groupId) {
      console.log('load group buzz: ', groupId);
      vm.busy = true;
      content = FeedService.buzzGroup().query({
        groupId: groupId,
        start: position
      }, function() {
        loadCallback(content);
      });
    }

    function loadUserContent(user) {
      console.log('load user buzz: ', user);
      vm.busy = true;
      content = FeedService.buzzUser().query({
          nickname: user.username,
          start: position
      }, function() {
          loadCallback(content);
      });
    }

    function create(groupId) {
        if (vm.state === 'write') {
            vm.post.type = 0;
            createPost(groupId);
        } else if (vm.state === 'suggest') {
            createSuggestion(groupId);
        }
    }

    function createPost(groupId) {
        vm.posting = true;
        vm.post.userId = Authentication.user.id;
        var Post = PostService.post();
        var item = new Post(vm.post);
        item.groupId = groupId;
        usSpinnerService.spin('spinner-1');
        item.$save(function(res) {
            vm.posting = false;
            vm.post = {};
            vm.content.unshift(res);
            usSpinnerService.stop('spinner-1');
        }, function(err) {
            vm.posting = false;
            console.log(err);
            usSpinnerService.stop('spinner-1');
        });
    }

    function createSuggestion(groupId) {
      // TODO - save post
      saveSuggestion();
    }

    function saveSuggestion() {
      vm.posting = true;
      usSpinnerService.spin('spinner-1');
      var Suggest = SuggestService.suggest();
      var suggestItem = new Suggest({
        name: vm.suggestion.name,
        url: vm.suggestion.url
      });

      suggestItem.$save(function(res) {
        vm.post = {
          url: vm.suggestion.url,
          body: vm.suggestion.name,
          type: 1,
          refType: 'Suggest',
          refId: res.id,
          meta: vm.suggestion.meta
        };
        createPost();
        vm.suggestion = {};
      }, function(err) {
        vm.posting = false;
        console.log(err);
        usSpinnerService.stop('spinner-1');
      });
    }

    function createContent(groupId) {
      vm.posting = true;
      vm.post.userId = vm.user.id;
      var Post = PostService.post();
      var item = new Post({
        body: vm.post.body,
        url: vm.post.url,
        meta: vm.post.meta,
        groupId: groupId
      });

      // Add youtube link to the body
      if (vm.post.ref && vm.post.media === 'yt') {
        item.body = 'https://www.youtube.com/watch?v=' + vm.post.ref + '\n' + vm.post.body;
      }

      usSpinnerService.spin('spinner-1');

      item.$save(function(res) {
        if (vm.post.media) {
          saveContent();
        }
        vm.posting = false;
        vm.post = {};
        vm.ContentService.model.selectedVideo = {};
        vm.state = 'content';
        vm.ContentService.model.state = 'select';
        vm.content.unshift(res);
        usSpinnerService.stop('spinner-1');
      }, function(err) {
        vm.posting = false;
        usSpinnerService.stop('spinner-1');
      });
    }

    function saveContent() {
      var Content = ContentService.content();
      var contentItem = new Content({
        media: vm.post.media,
        ref: vm.post.ref,
        campaignId: $state.params.campaignId,
        title: vm.post.title
      });

      contentItem.$save();
    }

    function addContent(event) {
        vm.disabled = true;
        var Post = PostService.post();
        var item = new Post();
        usSpinnerService.spin('spinner-1');
        item.body = vm.enteredBody;
        item.product_id = vm.selectedProduct;
        item.$save(function(res) {
            vm.content.unshift(res);
            $rootScope.eventObj = {
                x: event.pageX,
                y: event.pageY
            };
            //AuthService.refreshPoints();
            vm.enteredBody = '';
            vm.selectedProduct = null;
            vm.productErrorMsg = false;
            vm.disabled = false;
            if (res.content) {
                displayYoutubeVideo(res.content);
                displayTweet(res.content);
            }
            usSpinnerService.stop('spinner-1');
        }, function(err) {
            console.log(err);
            vm.postCount = 0;
            usSpinnerService.stop('spinner-1');
        });
    }

    function findCampaigns() {
      CampaignService.campaign().query(function(res) {
        vm.campaigns = CampaignService.pickRandoms(3, res);
      }, function(err) {
        vm.error = true;
        console.log(err);
      });
    }

    function findHangouts() {

      HangoutService.hangout().query(function(res) {
        vm.hangouts = CampaignService.pickRandoms(3, res);
      }, function(err) {
        vm.error = true;
        console.log(err);
      });
    }

    function loadCallback(content) {
        if (position === 0) {
            FeedService.model.posts = [];
        }
        for (var c = 0; c < content.length; c++) {
            if (content[c].content) {
                optimizeContentDisplay(content[c]);
            }
            FeedService.model.posts.push(content[c]);
        }
        if (position === 0) {
            vm.init = true;
        }
        if (content.length === 10) {
            $timeout(function(){vm.busy = false;}, 1000);
            position += 10;
        }
    }

    function optimizeContentDisplay(contentObject) {
        displayYoutubeVideo(contentObject.content);
        displayTweet(contentObject.content);
    }

    function contains(str, substr) {
        return (str.indexOf(substr) > -1);
    }

    var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    var timeRegexp = /t=(\d+)[ms]?(\d+)?s?/;

    // Put into service. Refactor the Regex. It should handle all of the logic that grabs the id.
    function displayYoutubeVideo(content) {
        if (typeof content.url === 'undefined') return;
        var match = content.url.match(/https:\/\/www.youtube.com\/watch/g);
        if (match) {
            var id = content.url.replace(youtubeRegexp, '$1');
            if (contains(id, ';')) {
                var pieces = id.split(';');
                if (contains(pieces[1], '%')) {
                    // links like this:
                    // "http://www.youtube.com/attribution_link?a=pxa6goHqzaA&amp;u=%2Fwatch%3Fv%3DdPdgx30w9sU%26feature%3Dshare"
                    // have the real query string URI encoded behind a ';'.
                    // at this point, `id is 'pxa6goHqzaA;u=%2Fwatch%3Fv%3DdPdgx30w9sU%26feature%3Dshare'
                    var uriComponent = decodeURIComponent(id.split(';')[1]);
                    id = ('http://youtube.com' + uriComponent)
                            .replace(youtubeRegexp, '$1');
                } else {
                    // https://www.youtube.com/watch?v=VbNF9X1waSc&amp;feature=youtu.be
                    // `id` looks like 'VbNF9X1waSc;feature=youtu.be' currently.
                    // strip the ';feature=youtu.be'
                    id = pieces[0];
                }
            } else if (contains(id, '#')) {
                // id might look like '93LvTKF_jW0#t=1'
                // and we want '93LvTKF_jW0'
                id = id.split('#')[0];
            }
            if (id) {
                content.youtube = 'https://www.youtube.com/embed/' + id;
            }
        }
        // Check for 'youtu.be' links
        var secondMatch;
        if (!match) {
            secondMatch = content.url.match(/youtu.be\//g);
            if (secondMatch) {
                var index = content.url.indexOf(secondMatch);
                var videoID = content.url.substring((index + 9), content.url.length);
                content.youtube = 'https://www.youtube.com/embed/' + videoID;
            }

        }
    }

    // Put into service.
    function displayTweet(content) {
        if (typeof content.url === 'undefined') return;

        var match = content.url.match(/twitter.com\/\w+\/status\/\w+/g);
        if (match && content.title) {
            var statusIndex = match[0].indexOf('/status/');
            var twitterUsername = match[0].substring(12, statusIndex);
            var onTwitterIndex = content.title.indexOf('on Twitter');
            var twitterName = content.title.substring(0, onTwitterIndex);
            var tweetBody = content.description.substring(1, (content.description.length - 1));
            var mediaIndex = content.image.indexOf('/media/');
            content.tweet = {
                twitterUsername: twitterUsername,
                twitterName: twitterName,
                tweetBody: tweetBody
            };
            if (mediaIndex > 0) {
                content.tweet.picture = content.image;
            }
        }
    }

    function displayLinkInput() {
        vm.enteringLink = true;
        vm.enteringPhoto = vm.enteringVideo = false;
    }

    function displayLinkPhoto() {
        vm.enteringPhoto = true;
        vm.enteringVideo = vm.enteringLink = false;
    }

    function displayLinkVideo() {
        vm.enteringVideo = true;
        vm.enteringPhoto = vm.enteringLink = false;
    }

    function selectTrialProduct(p) {
        vm.selectedProduct = p.id;
    }

    // if (twttr && twttr.events) {
    //     twttr.events.bind('tweet', function(event) {
    //         if ($rootScope.sharing === true || !AuthService.m.isLoggedIn) {
    //             return;
    //         }
    //         $rootScope.sharing = true;
    //         if (event.target.id === '3000') {
    //             var AddPoints = PointsService.addPoints();
    //             AddPoints.save({
    //                 activity_id: event.target.id,
    //                 product_id: event.target.attributes.product.value
    //             }, function() {
    //                 AuthService.refreshPoints();
    //                 $timeout(function() {
    //                     $rootScope.sharing = false;
    //                 }, 1000);
    //             });
    //         }
    //     });
    // }

}

})();
