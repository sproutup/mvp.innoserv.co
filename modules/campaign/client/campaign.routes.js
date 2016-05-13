'use strict';

angular
  .module('campaign')
  .config(campaignConfig);

function campaignConfig($stateProvider) {
  $stateProvider
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
