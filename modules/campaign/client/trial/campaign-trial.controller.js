'use strict';

angular
  .module('campaign')
  .controller('CampaignTrialController', CampaignTrialController);

CampaignTrialController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', 'PostService', 'usSpinnerService', 'ContentService', '$rootScope', '$uibModal'];

function CampaignTrialController(CampaignService, $state, Authentication, $scope, PostService, usSpinnerService, ContentService, $rootScope, $modal) {
  var vm = this;
  vm.find = find;
  vm.findOne = findOne;
  vm.findMyContribution = findMyContribution;
  vm.submitRequest = submitRequest;
  vm.findContributor = findContributor;
  vm.openCancelModal = openCancelModal;
  vm.cancelRequest = cancelRequest;
  vm.connected = connected;
  vm.createPost = createPost;
  vm.goToRequest = goToRequest;
  vm.state = $state;
  vm.user = Authentication.user;

  function find() {
    vm.campaigns = CampaignService.campaign().query({
      }, function() {
        console.log('campaigns found');
      }, function(err) {
        console.log(err);
      });
  }

  function findOne() {
    vm.success = false;

    CampaignService.campaign().get({
      campaignId: $state.params.campaignId
    }, function(res) {
      vm.campaignInit = true;
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
        if(vm.myContribution.log instanceof Array){
          for (var i = 0; i < vm.myContribution.log.length; i++) {
            sortLog(vm.myContribution);
          }
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
    var request = {
      userId: Authentication.user.id,
      campaignId: vm.campaign.id,
      phone: vm.phone,
      comment: vm.comment,
      bid: vm.bid
    };

    if (vm.addressDetails && vm.addressDetails.formatted_address) {
      request.address = vm.addressDetails.formatted_address;
    } else {
      request.address = vm.address;
    }

    CampaignService.contributor().save(request, function(res) {
      $state.go('navbar.campaign.trial.connect', { campaignId: vm.campaign.id });
    }, function(err) {
      vm.error = true;
    });
  }

  function connected() {
    $state.go('navbar.activity.trial.confirmation', { campaignId: vm.campaign.id });
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
      vm.ContentService.model.state = 'select';
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

  function openVerifyEmailModal() {
    var modalInstance = $modal.open({
      templateUrl: 'modules/users/client/verify-email.html',
      controller: 'DeleteController',
      controllerAs: 'vm',
      resolve: {
        message: function() { return 'Confirm your email in your settings before placing a request.'; }
      }
    });
  }

  function openCancelModal() {
    var modalInstance = $modal.open({
      templateUrl: 'modules/core/client/cancel-request-confirmation.html',
      controller: 'DeleteController',
      controllerAs: 'vm',
      resolve: {
        message: function() { return 'Your request will be gone forever and ever.'; }
      }
    });

    modalInstance.result.then(function () {
      cancelRequest();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  function cancelRequest() {
    CampaignService.campaignSingle().delete(
      { campaignId: $state.params.campaignId, userId: Authentication.user.id }, function(res){
        console.log('state changed');
        vm.myContribution = null;
      }
    );
  }

  function goToRequest() {
    if (Authentication.user && !Authentication.user.emailConfirmed) {
      openVerifyEmailModal();
      return;
    }

    $state.go('navbar.campaign.trial.info');
  }

}
