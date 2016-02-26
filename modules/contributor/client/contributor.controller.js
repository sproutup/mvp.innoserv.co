'use strict';

angular
  .module('contributor')
  .controller('ContributorController', ContributorController);

ContributorController.$inject = ['$scope', 'Authentication', 'ContributorService', '$state'];

function ContributorController($scope, Authentication, ContributorService, $state) {
  var vm = this;
  vm.findOne = findOne;
  vm.campaignId = $state.params.campaignId;

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
}
