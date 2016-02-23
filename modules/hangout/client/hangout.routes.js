'use strict';

angular
    .module('hangout')
    .config(config);

function config($stateProvider) {
  $stateProvider
    .state('navbar.hangout', {
      url: '/hangout',
      abstract: true,
      template: '<div ui-view><div>',
      controller: 'HangoutController',
      controllerAs: 'vm',
      data: {
        title: 'Hangout With Cool People - SproutUp'
      }
    })
    .state('navbar.hangout.list', {
      url: '/list',
      abstract: true,
      templateUrl: 'modules/hangout/client/list-hangout.view.html',
      data: {
        title: 'Hangout - List'
      }
    })
    .state('navbar.hangout.list.future', {
      url: '',
      templateUrl: 'modules/hangout/client/list-future-hangout.view.html',
      data: {
        title: 'Hangout - List'
      }
    })
    .state('navbar.hangout.list.past', {
      url: '/past',
      templateUrl: 'modules/hangout/client/list-past-hangout.view.html',
      data: {
        title: 'Hangout - List'
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