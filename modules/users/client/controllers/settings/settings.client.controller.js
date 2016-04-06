'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication', 'Menus', '$state',
  function ($scope, Authentication, Menus, $state) {
    $scope.user = Authentication.user;
    var vm = this;
    vm.user = Authentication.user;
    vm.state = $state;

    // Get the topbar menu
    vm.menu = Menus.getMenu('settings');
  }
]);
