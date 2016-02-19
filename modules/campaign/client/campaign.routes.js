'use strict';

angular
  .module('campaign')
  .config(config);

function config($stateProvider) {
  $stateProvider
    .state('discover', {
      url: '/discover',
      abstract: true,
      templateUrl: 'modules/campaign/client/discover.view.html',
      controller: 'CampaignController',
      controllerAs: 'vm',
      data: {
        title: ''
      }
    })
    .state('user.campaign', {
      url: '/campaign',
      abstract: true,
      template: '<section ng-init="company.findByStateParam()"><div ui-view></div></section>',
      controller: 'CampaignController',
      controllerAs: 'vm',
      data: {
        title: ''
      }
    })
    .state('discover.list', {
      url: '',
      templateUrl: 'modules/campaign/client//list-campaign.view.html',
      data: {
          title: 'Campaign - List'
      }
    })
    .state('discover.mine', {
      url: '/my-stuff',
      templateUrl: 'modules/campaign/client/my-campaign.view.html',
      data: {
          title: 'Campaign - List'
      }
    });
}
