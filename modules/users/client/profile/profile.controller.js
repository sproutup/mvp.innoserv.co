 'use strict';

angular
  .module('team')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Menus', 'buzz', 'activities'];

function ProfileController($scope, $state, $location, Authentication, Menus, buzz, activities) {
  var vm = this;
  vm.buzz = buzz;
  vm.activities = activities;
  vm.state = $state;
  vm.success = false;
  vm.auth = Authentication;

  // Get the topbar menu
  vm.menu = Menus.getMenu('user.profile.menu');
}
