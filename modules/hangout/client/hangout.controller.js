'use strict';

(function () {

angular
  .module('hangout')
  .controller('HangoutController', HangoutController);

HangoutController.$inject = ['HangoutService', '$state'];

function HangoutController(HangoutService, $state) {
  var vm = this;
  vm.item = {};
  vm.list = [];
  vm.find = find;
  vm.date = new Date().toISOString();

  function find() {
    HangoutService.hangout().query(function(val) {
      vm.list = val;
    }, function(err) {
      console.log(err);
    });
  }

  function findOne() {
    vm.success = false;

    HangoutService.hangout().get({
      campaignId: $state.params.hangoutId
    }, function(val) {
      vm.item = val;
    }, function(err) {
      //$state.go('landing.default');
      console.log(err);
    });
  }

}

})();
