'use strict';

angular
  .module('comments')
  .directive('upComments', upComments);

function upComments() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/comments/client/up-comments.html',
    scope: {
      comments: '=',
      id: '=upId',
      type: '@upType',
      commenting: '=',
      state: '@',
      params: '='
    },
    link: linkFunc,
    controller: upCommentsController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function linkFunc(scope, el, attr, ctrl) {
  }
}

upCommentsController.$inject = ['CommentService', 'Authentication', '$timeout', '$scope', '$rootScope', '$resource', 'usSpinnerService', '$state'];

function upCommentsController(CommentService, Authentication, $timeout, $scope, $rootScope, $resource, usSpinnerService, $state) {
  var vm = this;
  vm.user = Authentication.user;
  vm.disabled = false;

  CommentService.comment().query({
    refType: 'Post',
    refId: vm.id
  }, function(response){
    vm.comments = response;
  }, function(error) {
    vm.error = error;
    console.log(error);
  });

  vm.handleAddCommentClick = function() {
    if (!Authentication.user) {
      $scope.$emit('LoginEvent', {
        someProp: 'Sending you an Object!' // send whatever you want
      });
      return;
    }
    vm.commenting = !vm.commenting;
  };

  vm.addComment = function(event) {
    // Prevent double posting with vm.disabled
    vm.disabled = true;
    usSpinnerService.spin('spinner-3');
    var Comment = CommentService.comment(vm.type, vm.id);
    var newComment = new Comment();
    newComment.body = vm.newComment;
    newComment.$save(function(res) {
      if(typeof vm.comments === 'undefined') vm.comments = [];
      vm.comments.push(res);
      vm.newComment = '';
      vm.disabled = false;
      usSpinnerService.stop('spinner-3');
    });
  };

  // logic for a spinner after the save—should be moved to a directive
  var opts = {
    lines: 8, // The number of lines to draw
    length: 16, // The length of each line
    width: 23, // The line thickness
    radius: 42, // The radius of the inner circle
    scale: 0.13, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: 'white', // #rgb or #rrggbb or array of colors
    opacity: 0.25, // Opacity of the lines
    rotate: 0, // The rotation offset
    direction: -1, // 1: clockwise, -1: counterclockwise
    speed: 0.8, // Rounds per second
    trail: 60, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: false,// Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    position: 'absolute' // Element positioning
  };
}
