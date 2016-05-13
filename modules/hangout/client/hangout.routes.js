'use strict';

angular.module('hangout').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
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
