'use strict';

angular
  .module('campaign')
  .config(trialConfig);

function trialConfig($stateProvider) {
  $stateProvider
    .state('navbar.campaign.trial.info', {
      url: '/request/info',
      templateUrl: 'modules/campaign/client/trial/info.html',
      data: {
        title: 'Join Campaign'
      }
    })
    .state('navbar.campaign.trial.connect', {
      url: '/request/connect',
      templateUrl: 'modules/campaign/client/trial/social-connection.html',
      data: {
        title: 'Join Campaign'
      }
    });
//    .state('navbar.slug.campaignxx.referral', {
//      url: '/{username: slugItem}',
//      template: '<div>referral</div>',
//      controller: 'ReferralController',
//      controllerAs: 'referral'
//    });
}
