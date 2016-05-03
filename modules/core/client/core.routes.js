'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
  function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    var patt = new RegExp('^[a-zA-Z0-9]+$');

    $urlMatcherFactoryProvider.type('slugItem', {
      decode: function(val) {
        return val.toLowerCase();
      },
      encode: function(val) {
        return val;
      },
      equals: function(a, b) {
        return this.is(a) && a === b;
      },
      is: function(val) {
        return patt.test(val);
      },
      pattern: /(?!theme$|discover$|hangout$|conversation$|settings$|authentication$|welcome$)[a-zA-Z0-9]+/
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('/not-found');

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
      .state('navbar.landing' ,{
        url: '/',
        templateUrl: 'modules/core/client/landing.view.html',
        controller: 'BuzzController',
        controllerAs: 'vm',
        data: {
            title: 'SproutUp'
        }
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
      .state('navbar.i', {
        url: '/i',
        abstract: true,
        template: '<ui-view />'
      })
      .state('navbar.slug', {
        //url: '/{slug: ^(?!theme$|discover$|hangout$|conversation$|settings$|authentication$).*}',
        url: '/{slug:slugItem}',
        //url: '/:slug',
        controller: 'SlugController',
        controllerAs: 'slug',
        template: '<div ui-view></div>',
        resolve: {
          // After this is resolved, new routes are being found at the same time the slug controller is redirecting
          // It'd be nice if we could be sent to the correct routes right after this SlugService.find
          slugitem: function($stateParams, SlugService) {
            return SlugService.find($stateParams.slug);
          }
        }
      });
  }
]);
