'use strict';

angular
  .module('campaign')
  .config(trialConfig);

function trialConfig($stateProvider) {
  $stateProvider
    .state('navbar.slug.campaign.trial', {
      url: '',
      abstract: true,
      template: '<div ui-view><div>',
      controller: 'CampaignTrialController',
      controllerAs: 'vm',
      data: {
        title: ''
      }
    })
    .state('navbar.slug.campaign.trial.view', {
      url: '',
      abstract: true,
      templateUrl: 'modules/campaign/client/trial/trial.html'
    })
    .state('navbar.slug.campaign.trial.view.details', {
      url: '',
      templateUrl: 'modules/campaign/client/trial/trial-details.html',
      data: {
        title: 'Campaign'
      }
    })
    // These three routes don't have a '/' in front because we're temporarily using '/' in navbar.slug.campaign
    .state('navbar.slug.campaign.trial.view.buzz', {
      url: 'buzz',
      controller: 'BuzzController',
      controllerAs: 'buzzCtrl',
      templateUrl: 'modules/campaign/client/trial/trial-buzz.html',
      data: {
        title: 'Campaign'
      }
    })
    .state('navbar.slug.campaign.trial.info', {
      url: 'request/info',
      templateUrl: 'modules/campaign/client/trial/info.html',
      data: {
        title: 'Join Campaign'
      }
    })
    .state('navbar.slug.campaign.trial.connect', {
      url: 'request/connect',
      templateUrl: 'modules/campaign/client/trial/social-connection.html',
      data: {
        title: 'Join Campaign'
      }
    })
    .state('navbar.slug.campaign.referral', {
      url: ':username',
      template: '<div>referral</div>',
      controller: 'ReferralController',
      controllerAs: 'referral'
    });
}
