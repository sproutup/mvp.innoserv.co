'use strict';

angular
  .module('team')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Menus'];

function ProfileController($scope, $state, $location, Authentication, Menus) {
  var vm = this;
  vm.success = false;
  vm.auth = Authentication;

  console.log('profile controller loaded');
  // Get the topbar menu
  vm.menu = Menus.getMenu('user.profile.menu');
}
