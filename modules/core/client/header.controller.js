'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$window',
  function ($scope, $state, Authentication, Menus, $window) {
    var vm = this;
    vm.toggleCollapsibleMenu = toggleCollapsibleMenu;
    // Expose view variables
    vm.$state = $state;
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    // Get the navbar menu
    vm.menu = Menus.getMenu('navbar');

    // Toggle the menu items
    function toggleCollapsibleMenu() {
      vm.isCollapsed = !vm.isCollapsed;
    }

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      vm.isCollapsed = false;
    });

    $scope.signout = function() {
      window.mixpanel.cookie.clear();
      window.mixpanel.init('GARBAGE');
      setTimeout(function() {
        $window.location.pathname = '/api/auth/signout';
      }, 0);
    };
  }
]);
