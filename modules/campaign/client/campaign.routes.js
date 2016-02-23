'use strict';

angular
  .module('campaign')
  .config(config);

function config($stateProvider) {
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
    .state('navbar.discover.list', {
      url: '',
      templateUrl: 'modules/campaign/client//list-campaign.view.html',
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
    });
}
