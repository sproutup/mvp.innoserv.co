'use strict';

angular
  .module('campaign')
  .config(campaignConfig);

function campaignConfig($stateProvider) {
  $stateProvider
    .state('navbar.discover', {
      url: '/discover',
      abstract: true,
      templateUrl: 'modules/campaign/client/discover.view.html',
      controller: 'CampaignController',
      controllerAs: 'vm',
      data: {
        title: ''
      }
    })
    .state('navbar.campaign', {
      url: '/campaign/:campaignId',
      abstract: true,
      template: '<div ui-view ng-init="campaign.findOne()"><div>',
      controller: 'CampaignController',
      controllerAs: 'campaign'
    })
    .state('navbar.discover.list', {
      url: '',
      templateUrl: 'modules/campaign/client/list-campaign.view.html',
      data: {
          title: 'Campaign - List'
      }
    })
    .state('navbar.discover.mine', {
      url: '/my-stuff',
      templateUrl: 'modules/campaign/client/my-campaign.view.html',
      data: {
          title: 'Campaign - List'
      }
    })
    .state('navbar.slug.user.activities' ,{
      url: '/activities',
      templateUrl: 'modules/campaign/client/user-activities.html',
      data: {
          title: 'Activities - SproutUp'
      }
    });
}
