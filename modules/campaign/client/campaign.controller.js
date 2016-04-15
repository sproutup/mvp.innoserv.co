(function () {
  'use strict';

angular
  .module('campaign')
  .controller('CampaignController', CampaignController);

CampaignController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', '$interval', 'MessageService'];

function CampaignController(CampaignService, $state, Authentication, $scope, $interval, MessageService) {
  var vm = this;
  vm.product = {};
  vm.find = find;
  vm.findOne = findOne;
  vm.loadChannel = loadChannel;
  vm.startChannel = startChannel;
  vm.findMyCampaigns = findMyCampaigns;
  vm.returnMatch = returnMatch;
  vm.cancelRequest = cancelRequest;
  vm.editRequest = editRequest;
  vm.startInterval = startInterval;
  vm.state = $state;

  function loadChannel(){
    console.log('find channel by ref: ', $state.params.campaignId);
    var myChannelRef = MessageService.myChannelRef();
    var item = new myChannelRef({
      userId: Authentication.user.id
    });
    // Use save to post a request. we are not really saving anything
    item.$save({refId: $state.params.campaignId}, function (channel) {
      if(channel.id){
        console.log('channel found: ', channel.id);
        vm.channelId = channel.id;
      }
    }, function (errorResponse) {
      console.log(errorResponse);
      vm.error = errorResponse.data.message;
    });
  }

  function startChannel(){
    console.log('start channel by ref: ', $state.params.campaignId);
    var campaignChannel = MessageService.campaignChannel();
    var item = new campaignChannel({
      userId: Authentication.user.id
    });
    // Use save to post a request. we are not really saving anything
    item.$save({campaignId: $state.params.campaignId}, function (channel) {
      if(channel.id){
        console.log('channel created: ', channel.id);
        vm.channelId = channel.id;
      }
    }, function (errorResponse) {
      console.log(errorResponse);
      vm.error = errorResponse.data.message;
    });
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
   var lastIndex = 0;
   function showNext(){
     // Randomly generate a campaign
     index = Math.floor((Math.random() * 100) + 1) % vm.campaigns.length;
     // Make sure that the next campaign is different
     while(index == lastIndex) {
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

}

})();
