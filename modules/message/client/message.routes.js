'use strict';

angular.module('message.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('navbar.conversation', {
        url: '/conversation',
        abstract: true,
        template: '<div ui-view></div>',
        controller: 'MessageController',
        controllerAs: 'messageCtrl'
      })
      .state('navbar.conversation.list', {
        url: '/list',
        templateUrl: 'modules/message/client/list-messages.view.html',
        data: {
          title: 'My Messages'
        }
      })
      .state('navbar.conversation.view', {
        url: '/:channelId',
        templateUrl: 'modules/message/client/view-message.view.html',
        data: {
          title: 'My Messages'
        }
      });
  }
]);
