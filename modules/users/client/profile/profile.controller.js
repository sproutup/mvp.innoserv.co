'use strict';

angular
  .module('team')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Menus', 'buzz', 'activities', 'MetricService', 'slugitem'];

function ProfileController($scope, $state, $location, Authentication, Menus, buzz, activities, MetricService, slugitem) {
  var vm = this;
  vm.buzz = buzz;
  vm.activities = activities;
  vm.state = $state;
  vm.success = false;
  vm.auth = Authentication;
  vm.slugitem = slugitem.data.item;

  // Get the topbar menu
  vm.menu = Menus.getMenu('user.profile.menu');

  MetricService.metrics().get({
    userId: slugitem.data.item.id
  }, function(res) {
    vm.services = res;
  });
}
