'use strict';

angular
  .module('campaign')
  .config(config);

function config($stateProvider) {
  $stateProvider
    .state('navbar.slug.campaign.contest', {
      url: '/contest',
      abstract: true,
      template: '<div ui-view><div>',
      controller: 'CampaignContestController',
      controllerAs: 'vm',
      data: {
        title: ''
      }
    })
    .state('navbar.slug.campaign.contest.view', {
      url: '',
      templateUrl: 'assets/app/contest/contest.html',
      data: {
        title: 'Campaign - List'
      }
    });
}
