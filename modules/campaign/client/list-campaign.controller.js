'use strict';

angular
  .module('campaign')
  .controller('ListCampaignController', ListCampaignController);

ListCampaignController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', '$interval', 'MessageService', '$uibModal'];

function ListCampaignController(CampaignService, $state, Authentication, $scope, $interval, MessageService, $modal) {
  var vm = this;
  vm.product = {};
  vm.find = find;
  vm.findMyCampaigns = findMyCampaigns;
  vm.startInterval = startInterval;
  vm.state = $state;
  vm.user = Authentication.user;
  vm.openCancelModal = openCancelModal;
  vm.cancelRequest = cancelRequest;
  vm.filterActive = filterActive;

  function openCancelModal(campaignId) {
    console.log('Open cancel modal');
    var modalInstance = $modal.open({
      templateUrl: 'modules/core/client/cancel-request-confirmation.html',
      controller: 'DeleteController',
      controllerAs: 'vm',
      resolve: {
        message: function() { return 'Your request will be gone forever and ever.'; }
      }
    });

    modalInstance.result.then(function () {
      cancelRequest(campaignId);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  function cancelRequest(campaignId) {
    CampaignService.campaignSingle().delete(
      { campaignId: campaignId, userId: Authentication.user.id }, function(res){
        console.log('state changed');
        var index = -1;
        for(var i = 0, len = vm.myCampaigns.length; i < len; i++) {
          if (vm.myCampaigns[i].campaignId === campaignId) {
            index = i;
            break;
          }
        }
        if(index > -1){
          vm.myCampaigns.splice(index, 1);
        }
      }
    );
  }

  function find() {
     CampaignService.campaign().query({
      }, function(res) {
        vm.campaigns = res;
        showNext(); //avoid empty frame
      }, function(err) {
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

  function findMyCampaigns() {
    CampaignService.listMyContributions().query({
      userId: Authentication.user.id
    }, function(data) {
      vm.myCampaigns = data;
      for (var i = 0; i < vm.myCampaigns.length; i++) {
        sortLog(vm.myCampaigns[i]);
      }
    }, function(error) {
      console.log(error);
    });
  }

   // Make sure that the interval is destroyed too
   $scope.$on('$destroy', cancelInterval);

   var index = 0;
   var lastIndex = 0;
   function showNext(){
     // Randomly generate a campaign
     index = Math.floor((Math.random() * 100) + 1) % vm.campaigns.length;
     // Make sure that the next campaign is different
     while(vm.campaigns.length > 1 && index === lastIndex) {
       index = Math.floor((Math.random() * 100) + 1) % vm.campaigns.length;
     }
     lastIndex = index;
     //console.log('Campaign #' + index + ' out of ' + vm.campaigns.length + ' campaigns');
     vm.next = vm.campaigns[index];
   }

   function startInterval(){
     //console.log('start interval');
     if (!angular.isDefined(vm.stopPromise)) {
       vm.stopPromise = $interval(showNext, 4000);
     }
   }

   function cancelInterval(){
     //console.log('cancel interval');
     if (angular.isDefined(vm.stopPromise)) {
       $interval.cancel(vm.stopPromise);
       vm.stopPromise = undefined;
     }
   }

  function filterActive() {
    vm.query = {
      type: 'trial',
      status: 10
    };
  }

}
