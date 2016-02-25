(function () {
  'use strict';

angular
  .module('campaign')
  .controller('CampaignController', CampaignController);

CampaignController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', '$interval'];

function CampaignController(CampaignService, $state, Authentication, $scope, $interval) {
  var vm = this;
  vm.product = {};
  vm.find = find;
  vm.findOne = findOne;
  vm.findMyCampaigns = findMyCampaigns;
  vm.returnMatch = returnMatch;
  vm.cancelRequest = cancelRequest;
  vm.editRequest = editRequest;
  vm.stopPromise = $interval(showNext, 5000);

  function find() {
     CampaignService.campaign().query({
      }, function(res) {
        vm.campaigns = res;
        showNext(); //avoid empty frame
      }, function(err) {
        console.log(err);
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
//    CampaignService.campaignSingle().update(
//      { campaignId: campaignId, userId: AuthService.m.user.id }, { state: -1 }, function(res){
//        console.log('state changed');
//      }
//    );
  }

  function editRequest(campaignId) {
    $state.go('user.navbar.trial.edit', { campaignId: campaignId, userId: Authentication.user.id });
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

  function findOne(campaignId) {
    vm.success = false;
    var _id = null;

    if(campaignId){
      _id = campaignId;
    }
    else{
      _id = $state.params.campaignId;
    }

    var campaign = CampaignService.campaign().get({
      campaignId: _id
    }, function() {
      vm.item = campaign;
    }, function(err) {
      console.log(err);
    });
  }

  function returnMatch(actual, expected) {
    if (!expected) {
       return true;
    }
    return angular.equals(expected, actual);
  }

   // Make sure that the interval is destroyed too
   $scope.$on('$destroy', cancelInterval);

   var index = 0;
   function showNext(){
     vm.next = vm.campaigns[index++ % vm.campaigns.length];
   }

   function cancelInterval(){
     if (angular.isDefined(vm.stopPromise)) {
       $interval.cancel(vm.stopPromise);
       vm.stopPromise = undefined;
     }
   }

}

})();
