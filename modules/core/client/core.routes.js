'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('navbar' , {
        url: '',
        abstract: true,
        templateUrl: 'modules/core/client/header.view.html',
        controller: 'HeaderController',
        controllerAs: 'vm'
      })
      .state('navbar.home', {
        url: '/',
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: 'modules/core/client/home.view.html'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/404.view.html'
      });
  }
]);
