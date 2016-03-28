'use strict';

angular
  .module('users')
  .controller('EditProfileController', EditProfileController);

EditProfileController.$inject = ['$http', '$location', 'Users', 'Authentication'];

function EditProfileController($http, $location, Users, Authentication) {
  var vm = this;
  vm.user = {};
  vm.updateUserProfile = updateUserProfile;
  vm.emailConfirmation = emailConfirmation;

  vm.user.displayName = Authentication.user.displayName;
  vm.user.email = Authentication.user.email;
  vm.user.username = Authentication.user.username;
  vm.user.description = Authentication.user.description;
  vm.user.phone = Authentication.user.phone;
  vm.user.address = Authentication.user.address;

  // Update a user profile
  function updateUserProfile () {
    vm.success = vm.error = null;
    var user = new Users(vm.user);

    user.$update(function (response) {
      vm.success = true;
      Authentication.user = response;
    }, function (response) {
      vm.error = response.data.message;
    });
  }

  // Send another email confirmation
  function emailConfirmation () {
      $http.post('/api/users/email/confirmation').success(function (response) {
          vm.message = 'Email sent successfully';
          vm.success = true;
      }).error(function (response) {
          vm.message = 'Email failed to send';
      });
  }
}
