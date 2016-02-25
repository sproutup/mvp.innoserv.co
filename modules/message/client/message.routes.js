'use strict';

angular.module('message').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('message', {
        url: '/message',
        abstract: true,
        template: '<div ui-view></div>',
        controller: 'MessageController',
        controllerAs: 'messageCtrl'
      });
  }
]);
