'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('navbar.slug.user', {
      //  abstract: true,
        url: '',
        templateUrl: 'modules/users/client/profile/profile.header.view.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      });
  }
]);
