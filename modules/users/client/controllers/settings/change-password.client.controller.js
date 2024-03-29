'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;

      $http.put('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
        $scope.changePasswordForm.newPassword.$touched = null;
        $scope.changePasswordForm.$submitted = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.setUserPassword = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/users/password', { password: $scope.newPassword }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.newPassword = null;
        $scope.setPasswordForm.newPassword.$touched = null;
        $scope.setPasswordForm.$submitted = null;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

  }
]);
