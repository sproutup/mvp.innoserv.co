'use strict';

angular
  .module('likes')
  .directive('upLike', upLike);

function upLike() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/likes/client/up-like.html',
    scope: {
      likes: '=',
      id: '=upId',
      type: '@upType',
      state: '@',
      params: '='
    },
    link: linkFunc,
    controller: upLikeController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function linkFunc(scope, el, attr, ctrl) {
  }
}

upLikeController.$inject = ['LikesService', 'Authentication', '$timeout', '$scope', '$rootScope'];

function upLikeController(likesService, Authentication, $timeout, $scope, $rootScope) {
  var vm = this;
  vm.upvoteMouseEnter = upvoteMouseEnter;
  vm.upvoteMouseLeave = upvoteMouseLeave;
  vm.didIlikeItAlready = didIlikeItAlready;
  vm.user = Authentication.user;

  function didIlikeItAlready() {
    if(Authentication.user) {
      var userid = Authentication.user.id;
      if ($scope.vm.likes === undefined) {
        return false;
      }
      for (var i = 0; i < $scope.vm.likes.length; i++) {
        if ($scope.vm.likes[i].userId === userid) {
          $scope.vm.upvoted = true;
          $scope.vm.likeId = $scope.vm.likes[i].id;
          $scope.vm.likeIndex = i;
          return true;
        }
      }
    }
    $scope.upvoted = false;
    return false;
  }

  function upvoteMouseEnter() {
    $timeout(function() {
      if (!vm.justLeft) {
        vm.hovering = true;
      }
    }, 300);
  }

  function upvoteMouseLeave() {
    vm.hovering = false;
    vm.justLeft = true;
    $timeout(function() {
      vm.justLeft = false;
    }, 300);
  }

  vm.handleUpvoteClick = function() {
    if (!Authentication.user) {
      $scope.$emit('LoginEvent', {
        someProp: 'Sending you an Object!' // send whatever you want
      });
      return;
    }

    if (didIlikeItAlready() === false) {
      likesService.addLike($scope.vm.id, $scope.vm.type).then(
        function(data) {
          if(typeof $scope.vm.likes === 'undefined') $scope.vm.likes = [];
          $scope.vm.likes.push(data);
          $scope.vm.upvoted = true;
        }, function(reason) {
          console.log('up-files failed: ' + reason);
        }
      );
    } else {
      likesService.deleteLike($scope.vm.likeId).then(
        function(data) {
          // remove the entry from local array
          $scope.vm.likes.splice(vm.likeIndex, 1);
        }, function(reason) {
          console.log('up-files failed: ' + reason);
        }
      );
    }
  };
}
