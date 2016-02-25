(function () {
  'use strict';

angular
  .module('campaign')
  .controller('CampaignTrialController', CampaignTrialController);

CampaignTrialController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', 'PostService', 'usSpinnerService', 'ContentService', '$rootScope'];

function CampaignTrialController(CampaignService, $state, Authentication, $scope, PostService, usSpinnerService, ContentService, $rootScope) {
  var vm = this;
  vm.find = find;
  vm.findOne = findOne;
  vm.findMyContribution = findMyContribution;
  vm.submitRequest = submitRequest;
  vm.findContributor = findContributor;
  vm.updateRequest = updateRequest;
  vm.cancelRequest = cancelRequest;
  vm.connected = connected;
  vm.createPost = createPost;

  function find() {
    vm.campaigns = CampaignService.campaign().query({
      }, function() {
        console.log('campaigns found');
      }, function(err) {
        console.log(err);
      });
  }

  function editRequestInit() {
    findOne();
    findContributor();
  }

  function findOne() {
    vm.success = false;

    CampaignService.campaign().get({
      campaignId: $state.params.campaignId
    }, function(res) {
      vm.campaign = res;
    }, function(err) {
      //$state.go('landing.default');
      console.log(err);
    });
  }

  function findContributor() {
    CampaignService.campaignSingle().get({
      campaignId: $state.params.campaignId,
      userId: $state.params.userId
    }, function(res) {
      vm.contributor = res;
    }, function(err) {
      //$state.go('landing.default');
      console.log(err);
    });
  }

  function findMyContribution() {
    CampaignService.campaignSingle().get({
      campaignId: $state.params.campaignId,
      userId: Authentication.user.id
    }, function(res) {
      vm.init = true;
      if (res.campaignId) {
        vm.myContribution = res;
        for (var i = 0; i < vm.myContribution.log.length; i++) {
          sortLog(vm.myContribution);
        }
      }
    }, function(err) {
      vm.init = true;
      //$state.go('landing.default');
      console.log(err);
    });
  }

  function sortLog(campaign) {
    if (campaign.log) {
      // Find approved logs
      campaign.approved = campaign.log.filter(function(item) {
        return item.state === 1;
      });

      // Find completed logs
      campaign.completed = campaign.log.filter(function(item) {
        return item.state === 10 || item.state === '10';
      });
    }
  }

  function submitRequest() {
    CampaignService.contributor().save({
      userId: Authentication.user.id,
      campaignId: vm.campaign.id,
      address: vm.address,
      phone: vm.phone,
      comment: vm.comment,
      bid: vm.bid
    }, function(res) {
      $state.go('user.navbar.trial.connect', { campaignId: vm.campaign.id });
    }, function(err) {
      vm.error = true;
    });
  }

  function updateRequest() {
    vm.contributor.$update({
      campaignId: vm.contributor.campaignId,
      userId: vm.contributor.userId
    }, function(res) {
      $state.go('user.navbar.trial.view.details', { campaignId: vm.campaign.id });
    }, function(err) {
      vm.error = true;
    });
  }

  function connected() {
    $state.go('user.activity.trial.confirmation', { campaignId: vm.campaign.id });
  }

  // TODO — Put create post and create content into services
  function createPost() {
    vm.posting = true;
    var Post = PostService.post();
    var item = new Post({
      userId: Authentication.user.id, // Remove this after we add it server side
      body: vm.post.body,
      groupId: $scope.vm.campaign.groupId
    });

    // Add youtube link to the body
    if (vm.post.ref && vm.post.media === 'yt') {
      item.body = 'https://www.youtube.com/watch?v=' + vm.post.ref + '\n' + vm.post.body;
    }

    usSpinnerService.spin('spinner-1');

    item.$save(function(res) {
      vm.posting = false;
      vm.post = {};
      vm.selectedVideo = {};
      vm.state = 'write';
      vm.contentState = 'select';
      // vm.content.unshift(res);
      usSpinnerService.stop('spinner-1');
    }, function(err) {
      vm.posting = false;
      usSpinnerService.stop('spinner-1');
    });

    if (vm.post.media) {
      saveContent();
    }
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

  function cancelRequest() {
    CampaignService.campaignSingle().delete(
      { campaignId: $state.params.campaignId, userId: Authentication.user.id }, function(res){
        console.log('state changed');
        vm.myContribution = null;
      }
    );
//    CampaignService.campaignSingle().update(
//      { campaignId: campaignId, userId: Authentication.user.id }, { state: -1 }, function(res){
//        console.log('state changed');
//      }
//    );
  }
}

})();
