'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
  function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    var patt = new RegExp('^[a-zA-Z0-9]+$');

    // Redirect to 404 when route not found
//    $urlRouterProvider.otherwise('/not-found');

    // Home state routing
    $stateProvider
      .state('navbar' , {
        url: '',
        abstract: true,
        templateUrl: 'modules/core/client/header.view.html',
        controller: 'HeaderController',
        controllerAs: 'navbar'
      })
      .state('navbar.not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/404.view.html'
      })
      .state('navbar.landing' ,{
        url: '/',
        templateUrl: 'modules/core/client/landing.view.html',
        controller: 'BuzzController',
        controllerAs: 'vm',
        data: {
            title: 'SproutUp'
        }
      })
      .state('navbar.team', {
        url: '/team',
        templateUrl: 'modules/core/client/team.view.html'
      })
      .state('navbar.privacy', {
        url: '/privacy',
        templateUrl: 'modules/core/client/privacy.view.html'
      })
      .state('navbar.terms', {
        url: '/terms',
        templateUrl: 'modules/core/client/terms.view.html'
      })
      .state('navbar.how', {
        url: '/how',
        templateUrl: 'modules/core/client/how.view.html'
      })
      .state('navbar.i', {
        url: '/i',
        abstract: true,
        template: '<ui-view />'
      })
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
      .state('navbar.discover.list', {
        url: '',
        templateUrl: 'modules/campaign/client/list-campaign.view.html',
        data: {
          title: 'Campaigns'
        }
      })
      .state('navbar.hangout', {
        url: '/hangout',
        abstract: true,
        template: '<div ui-view><div>',
        controller: 'HangoutController',
        controllerAs: 'vm'
      })
      .state('navbar.hangout.list', {
        url: '/list',
        abstract: true,
        templateUrl: 'modules/hangout/client/list-hangout.view.html',
      })
      .state('navbar.hangout.list.future', {
        url: '',
        templateUrl: 'modules/hangout/client/list-future-hangout.view.html',
        data: {
          title: 'Upcoming Hangouts'
        }
      })
      .state('navbar.conversation', {
        url: '/conversation',
        abstract: true,
        template: '<div ui-view></div>',
        controller: 'MessageController',
        controllerAs: 'messageCtrl'
      })
      .state('navbar.conversation.list', {
        url: '/list',
        templateUrl: 'modules/message/client/list-messages.view.html',
        data: {
          title: 'My Messages'
        }
      })
      .state('navbar.conversation.view', {
        url: '/:channelId',
        templateUrl: 'modules/message/client/view-message.view.html',
        data: {
          title: 'My Messages'
        }
      })
      .state('navbar.campaign', {
        url: '/campaign/:campaignId',
        abstract: true,
        template: '<div ui-view ng-init="campaign.findOne()"><div>',
        controller: 'CampaignController',
        controllerAs: 'campaign'
      })
      .state('navbar.slug', {
        //url: '/{slug: ^(?!theme|discover|hangout|conversation|settings|authentication)[a-zA-Z0-9]+}',
        //url: '/{slug:slugItem}',
        url: '/:slug',
        controller: 'SlugController',
        controllerAs: 'slug',
        template: '<div ui-view></div>',
        resolve: {
          // After this is resolved, new routes are being found at the same time the slug controller is redirecting
          // It'd be nice if we could be sent to the correct routes right after this SlugService.find
          slugitem: function($stateParams, SlugService) {
            console.log('navbar.slug -> resolve');
            return SlugService.find($stateParams.slug);
          }
        }
      })
      .state('navbar.campaign.trial', {
        url: '',
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
        title: 'Campaign'
      }
    })
    .state('navbar.campaign.trial.view.buzz', {
      url: '/buzz',
      controller: 'BuzzController',
      controllerAs: 'buzzCtrl',
      templateUrl: 'modules/campaign/client/trial/trial-buzz.html',
      data: {
        title: 'Campaign'
      }
    })

      .state('navbar.slug.referral', {
        //url: '/{slug: ^(?!theme|discover|hangout|conversation|settings|authentication)[a-zA-Z0-9]+}',
        //url: '/{user:slugItem}',
        url: '/:userslug',
        template: '<div ui-view><div>',
        controller: 'CampaignController',
        controllerAs: 'campaign',
        resolve: {
          useritem: function($stateParams, SlugService) {
            console.log('resolve userslug');
            return SlugService.find($stateParams.userslug);
          }
        }
      });
  }
]);
