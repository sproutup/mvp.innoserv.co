'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('navbar.user', {
        abstract: true,
        url: '/user/:slug',
        templateUrl: 'modules/users/client/profile/profile.header.view.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        resolve: {
          slugitem: function($stateParams, SlugService) {
            console.log('navbar.user -> resolve');
            return SlugService.find($stateParams.slug);
          },
          buzz: function(FeedService, slugitem) {
            console.log('navbar.user -> buzz ', slugitem.data.item.id);
            return FeedService.getUserBuzz(slugitem.data.item.id, 0);
          },
          activities: function(CampaignService, slugitem) {
            console.log('navbar.user -> activities ', slugitem.data.item.id);
            return CampaignService.getUserActivities(slugitem.data.item.id);
          }
        }
      });
  }
]);
