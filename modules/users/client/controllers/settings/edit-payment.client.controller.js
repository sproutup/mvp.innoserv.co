'use strict';

angular
  .module('users')
  .controller('EditPaymentController', EditPaymentController);

EditPaymentController.$inject = ['$http', '$location', 'Users', 'Authentication', '$state'];

function EditPaymentController($http, $location, Users, Authentication, $state) {
  var vm = this;
  vm.user = {};
  vm.auth = {
    user: Authentication.user
  };
  vm.updateUserProfile = updateUserProfile;
  vm.back = back;
  vm.completeUserProfile = completeUserProfile;
  vm.user.cashtag = Authentication.user.cashtag;

  // Update a user profile
  function updateUserProfile () {
    vm.success = vm.error = null;
    var user = new Users(vm.user);

    user.$update(function (response) {
      console.log(response);
      vm.success = true;
      Authentication.user = response;
    }, function (response) {
      vm.error = response.data.message;
    });
  }

  function back () {
    $state.go($state.previous.state.name || 'navbar.home', $state.previous.params);
  }

  // Update a user profile
  function completeUserProfile () {
    vm.success = vm.error = null;
    var user = new Users(vm.user);

    user.$update(function (response) {
      vm.success = true;
      Authentication.user = response;
      $state.go('navbar.discover.list');
    }, function (response) {
      vm.error = response.data.message;
    });
  }
}
