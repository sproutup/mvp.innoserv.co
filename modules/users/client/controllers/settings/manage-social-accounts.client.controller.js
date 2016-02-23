'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.networks = [
      { provider: 'yt', status: 0, message: '', icon: 'modules/core/client/img/settings/youtube.png', title: 'Youtube', popover: 'If you have Google Analytics for your websites, please authorize us to read stats from your Google Analytics account. Reach is measured by the average page visits per month.' },
      { provider: 'ga', status: 0, message: '', icon: 'modules/core/client/img/settings/google-analytics.png', title: 'Google Analytics', popover: 'If you have Google Analytics for your websites, please authorize us to read stats from your Google Analytics account. Reach is measured by the average page visits per month.' },
      { provider: 'tw', status: 0, message: '', icon: 'modules/core/client/img/settings/twitter.png', title: 'Twitter', popover: '' },
      { provider: 'ig', status: 0, message: '', icon: 'modules/core/client/img/settings/instagram.png', title: 'Instagram', popover: ''  },
      { provider: 'fb', status: 0, message: '', icon: 'modules/core/client/img/settings/facebook.png', title: 'Facebook', popover: ''  },
      { provider: 'pi', status: 0, message: '', icon: 'modules/core/client/img/settings/pinterest.png', title: 'Pinterest', popover: ''  }
    ];

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);
