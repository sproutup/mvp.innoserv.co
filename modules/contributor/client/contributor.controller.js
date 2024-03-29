'use strict';

angular
.module('contributor')
.controller('ContributorController', ContributorController);

ContributorController.$inject = ['$scope', 'Authentication', 'ContributorService', '$state', 'CampaignService'];

function ContributorController($scope, Authentication, ContributorService, $state, CampaignService) {
  var vm = this;
  vm.findOne = findOne;
  vm.campaignId = $state.params.campaignId;
  vm.findCampaign = findCampaign;
  vm.updateRequest = updateRequest;

  function findOne() {
    vm.success = false;
    var item = ContributorService.contributor().get({
      userId: Authentication.user.id,
      campaignId: $state.params.campaignId
    }, function() {
      vm.item = item;
    }, function(err) {
      console.log(err);
    });
  }

  function findCampaign(id) {
    CampaignService.campaign().get({
      campaignId: id
    }, function(response) {
      vm.campaignInit = true;
      vm.campaign = response;
    });
  }

  function updateRequest() {
    vm.item.$update({
      campaignId: vm.item.campaignId,
      userId: vm.item.userId
    }, function(res) {
      $state.go('navbar.activity.trial.updated', { campaignId: vm.campaign.id });
    }, function(err) {
      vm.error = true;
    });
  }

}
