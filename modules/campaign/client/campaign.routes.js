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
      controller: 'ListCampaignController',
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
    .state('navbar.slug.campaign', {
//      url: '',
      url: '/campaign/:campaignId',
//      abstract: true,
//      template: '<div ui-view><h1>{{campaign.campaign.name}}</h1><div>',
//      template: '<div ui-view ng-init="campaign.init()"><div>',
      template: '<div ui-view ng-init="campaign.findOne()"><div>',
      controller: 'CampaignController',
      controllerAs: 'campaign',
      resolve: {
        slugitem: function($stateParams, SlugService) {
          console.log('navbar.slug.campaign -> resolve');
          return SlugService.getCurrent();
        }
      }
    })
    .state('navbar.slug.campaign.referral', {
      url: '/{user:slugItem}',
      template: '<div ui-view><div>',
      controller: 'CampaignController',
      controllerAs: 'campaign',
      resolve: {
        useritem: function($stateParams, SlugService) {
          console.log('resolve referral');
          return SlugService.find($stateParams.user);
        }
      }
    })
    .state('navbar.discover.list', {
      url: '',
      templateUrl: 'modules/campaign/client/list-campaign.view.html',
      data: {
          title: 'Campaigns'
      }
    })
    .state('navbar.discover.mine', {
      url: '/my-stuff',
      templateUrl: 'modules/campaign/client/my-campaign.view.html',
      data: {
          title: 'My Stuff'
      }
    })
    .state('navbar.user.activities' ,{
      url: '/activities',
      templateUrl: 'modules/campaign/client/user-activities.html',
      data: {
          title: 'My Activities'
      }
    });
}
