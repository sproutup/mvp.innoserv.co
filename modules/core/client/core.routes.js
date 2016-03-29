'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('navbar.not-found');

    // Home state routing
    $stateProvider
      .state('navbar' , {
        url: '',
        abstract: true,
        templateUrl: 'modules/core/client/header.view.html',
        controller: 'HeaderController',
        controllerAs: 'navbar'
      })
      .state('navbar.not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/404.view.html'
      })
      .state('navbar.team', {
        url: '/team',
        templateUrl: 'modules/core/client/team.view.html'
      })
      .state('navbar.privacy', {
        url: '/privacy',
        templateUrl: 'modules/core/client/privacy.view.html'
      })
      .state('navbar.terms', {
        url: '/terms',
        templateUrl: 'modules/core/client/terms.view.html'
      })
      .state('navbar.slug', {
        url: '/{slug: ^(?!theme|discover|hangout|conversation|settings|authentication).*$}',
        controller: 'SlugController',
        controllerAs: 'slug',
        template: '<div ui-view ng-init="slug.slug()"></div>',
        resolve: {
          slugitem: function($stateParams, SlugService) {
            return SlugService.find($stateParams.slug);
          }
        }
      });
  }
]);
