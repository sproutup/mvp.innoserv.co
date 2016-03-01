'use strict';

angular.module('message').config(['$stateProvider',
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
          pageTitle: 'Conversations'
        }
      })
      .state('navbar.conversation.view', {
        url: '/:channelId',
        templateUrl: 'modules/message/client/view-message.view.html'
      //   resolve: {
      //     articleResolve: getArticle
      //   },
      //   data:{
      //     pageTitle: 'Article {{ articleResolve.title }}'
      //   }
      });
  }
]);
