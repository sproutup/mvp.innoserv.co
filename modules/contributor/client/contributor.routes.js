'use strict';

angular
  .module('contributor')
  .config(config);

function config($stateProvider) {

  $stateProvider
    .state('navbar.my-activities', {
      url: '/my/activities',
      controller: 'ContributorController',
      controllerAs: 'vm',
      templateUrl: 'modules/contributor/client/my-activities.view.html',
      data: {
        title: 'My Activities'
      }
    })
    .state('navbar.activity', {
      url: '/activity/:campaignId',
      controller: 'ContributorController',
      controllerAs: 'vm',
      template: '<ui-view ng-init="vm.findOne()"></ui-view>',
      data: {
        title: 'My Activities'
      }
    })
    .state('navbar.activity.trial', {
      url: '/trial',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state('navbar.activity.trial.confirmation', {
      url: '/confirmation',
      templateUrl: 'modules/contributor/client/trial-confirmation.view.html',
      data: {
        title: 'Confirmation'
      }
    })
    .state('navbar.activity.trial.edit', {
      url: '/edit',
      templateUrl: 'modules/contributor/client/trial-edit.view.html',
      data: {
        title: 'Edit'
      }
    })
    .state('navbar.activity.contest', {
      url: '/contest',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state('navbar.activity.contest.confirmation', {
      url: '/confirmation',
      templateUrl: 'modules/contributor/client/contest-confirmation.view.html',
      data: {
        title: 'Confirmation'
      }
    })
    .state('navbar.activity.contest.edit', {
      url: '/edit',
      templateUrl: 'modules/contributor/client/contest-edit.view.html',
      data: {
        title: 'Edit'
      }
    });
}
