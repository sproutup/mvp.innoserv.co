(function () {
  'use strict';

angular
  .module('campaign')
  .controller('CampaignController', CampaignController);

CampaignController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', '$interval', 'MessageService', '$uibModal'];

function CampaignController(CampaignService, $state, Authentication, $scope, $interval, MessageService, $modal) {
  var vm = this;
  vm.product = {};
  vm.find = find;
  vm.findOne = findOne;
  vm.loadChannel = loadChannel;
  vm.startChannel = startChannel;
  vm.findMyCampaigns = findMyCampaigns;
  vm.returnMatch = returnMatch;
  vm.editRequest = editRequest;
  vm.user = Authentication.user;
//  vm.campaign = slugitem;
//  vm.init = init;

//  function init(){
//    console.log('campaign: ', $state.current.name);
//    if($state.current.name === 'navbar.slug.campaign') {
//      console.log('slug type: ', slugitem.hashtag);
////      $state.go('navbar.landing');
//      $state.go('navbar.campaign.' + slugitem.type + '.view.details', {id: slugitem.id});
//    }
//  }

  // This is a temporary hack because this route is being caught before we redirect in the slug controller
//  if(slugitem.data.type !== 'Campaign'){
//    if (slugitem.data.type === 'User') {
//      $state.go('navbar.slug.user.buzz');
//    } else {
//      var state = 'navbar.slug' + '.' + slugitem.data.type.toLowerCase();
//      $state.go(state);
//    }
//  }

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
      vm.campaign = campaign;
    }, function(err) {
      console.log(err);
    });
  }

  function loadChannel(){
    var channelKey = vm.campaign.id + ':' + Authentication.user.id;
    var myChannelRef = MessageService.myChannelRef();
    var item = new myChannelRef();

    // Use save to post a request. we are not really saving anything
    item.$save({id: channelKey}, function (channel) {
      if(channel.id) {
        vm.channelId = channel.id;
      }
    }, function (errorResponse) {
      console.log(errorResponse);
      vm.error = errorResponse.data.message;
    });
  }

  function startChannel(){
    var campaignChannel = MessageService.campaignChannel();
    var item = new campaignChannel();

    // Use save to post a request. we are not really saving anything
    item.$save({campaignId: vm.campaign.id}, function (channel) {
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
     while(index === lastIndex) {
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
