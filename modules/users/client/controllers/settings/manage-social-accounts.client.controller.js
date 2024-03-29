'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication', 'ProviderService', '$state',
  function ($scope, $http, Authentication, ProviderService, $state) {
    var vm = this;
    vm.state = $state;

    vm.user = Authentication.user;
    vm.networks = [
      { provider: 'google', status: 0, message: '', icon: 'modules/core/client/img/settings/google.png', title: 'Google', popover: 'If you have Google Analytics for your websites, please authorize us to read stats from your Google Analytics account. Reach is measured by the average page visits per month.' },
      { provider: 'twitter', status: 0, message: '', icon: 'modules/core/client/img/settings/twitter.png', title: 'Twitter', popover: '' },
      { provider: 'instagram', status: 0, message: '', icon: 'modules/core/client/img/settings/instagram.png', title: 'Instagram', popover: ''  },
      { provider: 'facebook', status: 0, message: '', icon: 'modules/core/client/img/settings/facebook.png', title: 'Facebook', popover: ''  }
//      { provider: 'pinterest', status: 0, message: '', icon: 'modules/core/client/img/settings/pinterest.png', title: 'Pinterest', popover: ''  }
    ];
    vm.providers = [];

    vm.load = function(){
      vm.providers = ProviderService.provider().query({
        userId: Authentication.user.id
      }, function() {
        console.log('providers found');
      }, function(err) {
        console.log(err);
      });
    };

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    vm.isConnectedSocialAccount = function (provider) {
      for (var i = 0; i < vm.providers.length; i++) {
        if(vm.providers[i].provider === provider) return true;
      }
      return false;
    };

    // Remove a user social account
    vm.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
        for (var i = 0; i < vm.providers.length; i++) {
          if(vm.providers[i].provider === provider) {
            vm.providers.splice(i);
          }
        }
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);
