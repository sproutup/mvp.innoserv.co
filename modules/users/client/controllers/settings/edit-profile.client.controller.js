'use strict';

angular
  .module('users')
  .controller('EditProfileController', EditProfileController);

EditProfileController.$inject = ['$http', '$location', 'Users', 'Authentication', '$state'];

function EditProfileController($http, $location, Users, Authentication, $state) {
  var vm = this;
  vm.user = {};
  vm.auth = {
    user: Authentication.user
  };
  vm.updateUserProfile = updateUserProfile;
  vm.sendEmailVerification = sendEmailVerification;
  vm.back = back;
  vm.completeUserProfile = completeUserProfile;
  vm.user.displayName = Authentication.user.displayName;
  vm.user.email = Authentication.user.email;
  vm.user.username = Authentication.user.username;
  vm.user.description = Authentication.user.description;
  vm.user.phone = Authentication.user.phone;
  vm.user.address = Authentication.user.address;
  vm.user.emailConfirmed = Authentication.user.emailConfirmed;

  // Update a user profile
  function updateUserProfile () {
    vm.success = vm.error = null;
    var user = new Users(vm.user);

    user.$update(function (response) {
      console.log(response);
      vm.success = true;
      vm.basicinfoform.email.$pristine = true;
      Authentication.user = response;
      vm.user.emailConfirmed = Authentication.user.emailConfirmed;
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

  // Send another email confirmation
  function sendEmailVerification () {
    $http.post('/api/auth/email/verification').success(function (response) {
      vm.emailSuccess = true;
      if (response.url) {
        vm.emailUrl = response.url;
      }
    }).error(function (response) {
        vm.message = 'Email failed to send';
    });
  }
}
