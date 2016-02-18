'use strict';

angular
  .module('theme')
  .config(['$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('theme', {
          url: '/theme',
          abstract: true,
          template: '<ui-view/>',
          controller: '',
          controllerAs: ''
        })
        .state('theme.index' ,{
            url: '',
            templateUrl: 'modules/theme/client/theme.view.html'
        })
        .state('theme.mocks', {
          url: '/mocks',
          abstract: true,
          template: '<ui-view/>'
        })
        .state('theme.mocks.hangout', {
          url: '/hangout',
          templateUrl: 'modules/theme/client/mocks/hangout.html'
        })
        .state('theme.mocks.browse-campaigns', {
          url: '/browse-campaigns',
          templateUrl: 'modules/theme/client/mocks/browse-campaigns.html'
        })
        .state('theme.mocks.my-campaigns', {
          url: '/my-campaigns',
          templateUrl: 'modules/theme/client/mocks/my-campaigns.html'
        })
        .state('theme.mocks.search', {
          url: '/search',
          templateUrl: 'modules/theme/client/mocks/search.html'
        })
        .state('theme.mocks.view-trial-campaign', {
          url: '/view-trial-campaign',
          templateUrl: 'modules/theme/client/mocks/view-trial-campaign.html'
        })
        .state('theme.mocks.join-trial-campaign', {
          url: '/join-trial-campaign',
          templateUrl: 'modules/theme/client/mocks/join-trial-campaign.html'
        })
        .state('theme.mocks.after-join-trial-campaign', {
          url: '/after-join-trial-campaign',
          templateUrl: 'modules/theme/client/mocks/after-join-trial-campaign.html'
        })
        .state('theme.mocks.trial-campaign-buzz', {
          url: '/trial-campaign-buzz',
          templateUrl: 'modules/theme/client/mocks/trial-campaign-buzz.html'
        })
        .state('theme.mocks.view-contest-campaign', {
          url: '/view-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/view-contest-campaign.html'
        })
        .state('theme.mocks.enter-contest-campaign', {
          url: '/enter-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/enter-contest-campaign.html'
        })
        .state('theme.mocks.finished-contest-campaign', {
          url: '/finished-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/finished-contest-campaign.html'
        })
        .state('theme.mocks.join-contest-campaign', {
          url: '/join-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/join-contest-campaign.html'
        })
        .state('theme.mocks.my-activities', {
          url: '/my-campaigns',
          templateUrl: 'modules/theme/client/mocks/my-activities.html'
        })
        .state('theme.mocks.company-profile', {
          url: '/company-profile',
          templateUrl: 'modules/theme/client/mocks/company-profile.html'
        })
        .state('theme.mocks.notification', {
          url: '/notification',
          templateUrl: 'modules/theme/client/mocks/notification.html'
        })
        .state('theme.mocks.buzz', {
          url: '/buzz',
          templateUrl: 'modules/theme/client/mocks/buzz.html'
        })
        .state('theme.mocks.suggest', {
          url: '/suggest',
          templateUrl: 'modules/theme/client/mocks/suggest.html'
        })
        .state('theme.mocks.my-profile-buzz', {
          url: '/my-profile-buzz',
          templateUrl: 'modules/theme/client/mocks/my-profile-buzz.html'
        })
        .state('theme.mocks.my-profile-activities', {
          url: '/my-profile-activities',
          templateUrl: 'modules/theme/client/mocks/my-profile-activities.html'
        })
        .state('theme.mocks.my-profile-suggested-products', {
          url: '/my-profile-suggested-products',
          templateUrl: 'modules/theme/client/mocks/my-profile-suggested-products.html'
        })
        // messages
        .state('theme.mocks.list-conversation', {
          url: '/list-conversation',
          templateUrl: 'modules/theme/client/mocks/list-conversation.html'
        })
        .state('theme.mocks.view-a-conversation', {
          url: '/view-a-conversation',
          templateUrl: 'modules/theme/client/mocks/view-a-conversation.html'
        });
      }
    ]);
