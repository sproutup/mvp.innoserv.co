'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', '$http',
  function ($scope, $timeout, $window, Authentication, $http) {
    var profile = this;

    profile.saveProfilePicture = saveProfilePicture;

    $scope.user = Authentication.user;
    $scope.imageURL = $scope.user.profileImageURL;

    // Save user profile picture
    function saveProfilePicture(fileId) {
      var req = {
        method: 'POST',
        url: 'api/users/picture',
        data: { fileId: fileId }
      };

      // Clear messages
      $scope.success = $scope.error = null;
      console.log('save:');
      $http(req).then(function(val){
        // Populate user object
        $scope.user = Authentication.user = val.data;
      }, function(err){
        console.log('err: ', err);
      });
    }
  }
]);
