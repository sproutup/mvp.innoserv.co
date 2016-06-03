'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$window', 'Authentication', '$analytics',
  function ($scope, $state, $stateParams, $http, $location, $window, Authentication, $analytics) {
    $scope.authentication = Authentication;
    $scope.credentials = {};

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;
    $scope.err = $stateParams.err;

    var saveTeamObject = function(userId, companyId) {
      var teamObj = {
        userId: userId,
        companyId: companyId
      };

      $http.post('/api/team', teamObj).success(function (team) {
        $scope.success = true;
      }).error(function (response) {
        // TODO display message with error message
        $scope.error = response.message;
      });
    };

    $scope.signup = function () {
      $scope.credentials.token = $state.params.token;
      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        $scope.authentication.user = response;
        $analytics.setAlias($scope.authentication.user.id);
        $analytics.setUserPropertiesOnce({ name: $scope.authentication.user.displayName });
        $state.go('navbar.home');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signupWithEmail = function () {
      $scope.authentication.emailSentTo = $scope.credentials.email;

      $http.post('/api/auth/join', $scope.credentials).success(function (response) {
        $scope.signupEmailSent = true;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.back = function () {
      //console.log('previous state: ', $state.previous.state.name);
      $state.go($state.previous.state.name || 'navbar.home', $state.previous.params);
    };

    $scope.signin = function () {
      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        $scope.authentication.user = response;
        $state.go($state.previous.state.name || 'navbar.home', $state.previous.params);
        window.Intercom('update', {
          email: Authentication.user.email,
          name: Authentication.user.displayName,
          user_id: Authentication.user.id
        });
        $analytics.setUsername($scope.authentication.user.id);
        $analytics.setUserPropertiesOnce({ name: $scope.authentication.user.displayName });
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };

    $scope.initCompany = function() {
      $scope.companyInit = true;
      $scope.newCompany = true;
    };

    $scope.verifyToken = function() {
      var credentials = {
        token: $state.params.token
      };
      $scope.company = {};

      $http.post('/api/auth/verifyToken', credentials).success(function (response) {
        if (response[1]) {
          $scope.company.id = response[1];
          $scope.company.name = response[2];
          $scope.company.slug = response[3];
          $scope.companyInit = true;
        }
        $scope.credentials.email = response[0];
      }).error(function (errorResponse) {
        $scope.error = errorResponse.message;
      });
    };

    $scope.verifyEmailToken = function() {
      $http.get('/api/auth/email/confirmation/' + $state.params.token).success(function (response) {
        $scope.success = true;
        $scope.emailInit = true;
        Authentication.user = response;
      }).error(function (errorResponse) {
        $scope.emailInit = true;
        $scope.error = errorResponse.message;
      });
    };
  }
]);
