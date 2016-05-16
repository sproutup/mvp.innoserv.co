'use strict';

angular.module('hangout.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('navbar.hangout', {
        url: '/hangout',
        abstract: true,
        template: '<div ui-view><div>',
        controller: 'HangoutController',
        controllerAs: 'vm'
      })
      .state('navbar.hangout.list', {
        url: '/list',
        abstract: true,
        templateUrl: 'modules/hangout/client/list-hangout.view.html',
      })
      .state('navbar.hangout.list.future', {
        url: '',
        templateUrl: 'modules/hangout/client/list-future-hangout.view.html',
        data: {
          title: 'Upcoming Hangouts'
        }
      })
      .state('navbar.hangout.list.past', {
        url: '/past',
        templateUrl: 'modules/hangout/client/list-past-hangout.view.html',
        data: {
          title: 'Past Hangouts'
        }
      })
      .state('navbar.hangoutPreview' ,{
        url: '/hangout-coming-soon',
        templateUrl: 'modules/hangout/client/hangout-coming-soon.html',
        controller: '',
        controllerAs: '',
        data: {
          title: 'Hangout With Cool People - SproutUp'
        }
      });
     }
]);
