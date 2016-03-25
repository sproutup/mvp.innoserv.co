'use strict';

angular
  .module('theme')
  .config(['$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('navbar.theme.mocks', {
          url: '/mocks',
          abstract: true,
          template: '<ui-view/>'
        })
        .state('navbar.theme.mocks.signin', {
          url: '/signin',
          templateUrl: 'modules/theme/client/mocks/signin.html'
        })
        .state('navbar.theme.mocks.ask-email', {
          url: '/ask-email',
          templateUrl: 'modules/theme/client/mocks/ask-email.html'
        })
        .state('navbar.theme.mocks.hangout', {
          url: '/hangout',
          templateUrl: 'modules/theme/client/mocks/hangout.html'
        })
        .state('navbar.theme.mocks.browse-campaigns', {
          url: '/browse-campaigns',
          templateUrl: 'modules/theme/client/mocks/browse-campaigns.html'
        })
        .state('navbar.theme.mocks.browse-more-campaigns', {
          url: '/browse-more-campaigns',
          templateUrl: 'modules/theme/client/mocks/browse-more-campaigns.html'
        })
        .state('navbar.theme.mocks.my-campaigns', {
          url: '/my-campaigns',
          templateUrl: 'modules/theme/client/mocks/my-campaigns.html'
        })
        .state('navbar.theme.mocks.search', {
          url: '/search',
          templateUrl: 'modules/theme/client/mocks/search.html'
        })
        .state('navbar.theme.mocks.view-trial-campaign', {
          url: '/view-trial-campaign',
          templateUrl: 'modules/theme/client/mocks/view-trial-campaign.html'
        })
        .state('navbar.theme.mocks.join-trial-campaign', {
          url: '/join-trial-campaign',
          templateUrl: 'modules/theme/client/mocks/join-trial-campaign.html'
        })
        .state('navbar.theme.mocks.after-join-trial-campaign', {
          url: '/after-join-trial-campaign',
          templateUrl: 'modules/theme/client/mocks/after-join-trial-campaign.html'
        })
        .state('navbar.theme.mocks.trial-campaign-buzz', {
          url: '/trial-campaign-buzz',
          templateUrl: 'modules/theme/client/mocks/trial-campaign-buzz.html'
        })
        .state('navbar.theme.mocks.view-contest-campaign', {
          url: '/view-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/view-contest-campaign.html'
        })
        .state('navbar.theme.mocks.enter-contest-campaign', {
          url: '/enter-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/enter-contest-campaign.html'
        })
        .state('navbar.theme.mocks.finished-contest-campaign', {
          url: '/finished-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/finished-contest-campaign.html'
        })
        .state('navbar.theme.mocks.join-contest-campaign', {
          url: '/join-contest-campaign',
          templateUrl: 'modules/theme/client/mocks/join-contest-campaign.html'
        })
        .state('navbar.theme.mocks.my-activities', {
          url: '/my-campaigns',
          templateUrl: 'modules/theme/client/mocks/my-activities.html'
        })
        .state('navbar.theme.mocks.company-profile', {
          url: '/company-profile',
          templateUrl: 'modules/theme/client/mocks/company-profile.html'
        })
        .state('navbar.theme.mocks.notification', {
          url: '/notification',
          templateUrl: 'modules/theme/client/mocks/notification.html'
        })
        .state('navbar.theme.mocks.buzz', {
          url: '/buzz',
          templateUrl: 'modules/theme/client/mocks/buzz.html'
        })
        .state('navbar.theme.mocks.single-buzz', {
          url: '/single-buzz',
          templateUrl: 'modules/theme/client/mocks/single-buzz.html'
        })
        .state('navbar.theme.mocks.suggest', {
          url: '/suggest',
          templateUrl: 'modules/theme/client/mocks/suggest.html'
        })
        .state('navbar.theme.mocks.my-profile-buzz', {
          url: '/my-profile-buzz',
          templateUrl: 'modules/theme/client/mocks/my-profile-buzz.html'
        })
        .state('navbar.theme.mocks.my-profile-activities', {
          url: '/my-profile-activities',
          templateUrl: 'modules/theme/client/mocks/my-profile-activities.html'
        })
        .state('navbar.theme.mocks.my-profile-suggested-products', {
          url: '/my-profile-suggested-products',
          templateUrl: 'modules/theme/client/mocks/my-profile-suggested-products.html'
        })
        // messages
        .state('navbar.theme.mocks.list-conversation', {
          url: '/list-conversation',
          templateUrl: 'modules/theme/client/mocks/list-conversation.html'
        })
        .state('navbar.theme.mocks.view-a-conversation', {
          url: '/view-a-conversation',
          templateUrl: 'modules/theme/client/mocks/view-a-conversation.html'
        })
        .state('navbar.theme.mocks.account-settings-profile', {
          url: '/account-settings-profile',
          templateUrl: 'modules/theme/client/mocks/account-settings-profile.html'
        })
        .state('navbar.theme.mocks.account-settings-social', {
          url: '/account-settings-social',
          templateUrl: 'modules/theme/client/mocks/account-settings-social.html'
        })
        .state('navbar.theme.mocks.team', {
          url: '/team',
          templateUrl: 'modules/theme/client/mocks/team.html'
        })
        .state('navbar.theme.mocks.about', {
          url: '/about',
          templateUrl: 'modules/theme/client/mocks/about.html'
        })
        .state('navbar.theme.mocks.my-dashboard', {
          url: '/my-dashboard',
          templateUrl: 'modules/theme/client/mocks/my-dashboard.html'
        });
      }
    ]);
