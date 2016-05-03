'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('navbar.slug.user', {
        // abstract: true,
        // using '/' instead of '' is a temporary solution to create different user & campaign routes
        url: '/',
        templateUrl: 'modules/users/client/profile/profile.header.view.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        resolve: {
          buzz: function(FeedService, slugitem) {
            return FeedService.getUserBuzz(slugitem.data.item.id, 0);
          },
          activities: function(CampaignService, slugitem) {
            return CampaignService.getUserActivities(slugitem.data.item.id);
          }
        }
      });
  }
]);
