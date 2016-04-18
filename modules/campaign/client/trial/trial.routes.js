'use strict';

angular
  .module('campaign')
  .config(trialConfig);

function trialConfig($stateProvider) {
  $stateProvider
    .state('navbar.campaign.trial', {
      url: '/trial',
      abstract: true,
      template: '<div ui-view><div>',
      controller: 'CampaignTrialController',
      controllerAs: 'vm',
      data: {
        title: ''
      }
    })
    .state('navbar.campaign.trial.view', {
      url: '',
      abstract: true,
      templateUrl: 'modules/campaign/client/trial/trial.html'
    })
    .state('navbar.campaign.trial.view.details', {
      url: '',
      templateUrl: 'modules/campaign/client/trial/trial-details.html',
      data: {
        title: 'Campaign - Details'
      }
    })
    .state('navbar.campaign.trial.view.buzz', {
      url: '/buzz',
      controller: 'BuzzController',
      controllerAs: 'buzzCtrl',
      templateUrl: 'modules/campaign/client/trial/trial-buzz.html',
      data: {
        title: 'Campaign - Buzz'
      }
    })
    .state('navbar.campaign.trial.info', {
      url: '/request/info',
      templateUrl: 'modules/campaign/client/trial/info.html',
      data: {
        title: 'Trial - Info'
      }
    })
    .state('navbar.campaign.trial.edit', {
      url: '/request/edit/:userId',
      templateUrl: 'modules/campaign/client/trial/edit.html',
      data: {
        title: 'Trial - Info'
      }
    })
    .state('navbar.campaign.trial.connect', {
      url: '/request/connect',
      templateUrl: 'modules/campaign/client/trial/social-connection.html',
      data: {
        title: 'Trial - Social'
      }
    });
}
