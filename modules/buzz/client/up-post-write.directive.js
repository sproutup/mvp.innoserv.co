'use strict';

angular
  .module('buzz')
  .directive('upPostWrite', upPostWrite);

function upPostWrite() {
  var directive = {
    controller: upPostWriteController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      group: '@'
    },
    link: linkFunc,
    templateUrl: 'modules/buzz/client/up-post-write.template.html'
  };

  return directive;

  function linkFunc(scope, element, attrs) {

  }
}

upPostWriteController.$inject = ['PostService', 'Authentication', 'usSpinnerService', 'FeedService'];

function upPostWriteController(PostService, Authentication, usSpinnerService, FeedService) {
  var vm = this;
  vm.create = create;
  vm.item = {
    body: ''
  };

  function create() {
    vm.posting = true;
    vm.item.userId = Authentication.user.id;
    var Post = PostService.post();
    var item = new Post(vm.item);
    item.groupId = vm.group;
    usSpinnerService.spin('spinner-1');
    item.$save(function(res) {
      vm.posting = false;
      vm.item = {
        body: ''
      };
      FeedService.model.posts.unshift(res);
      usSpinnerService.stop('spinner-1');
    }, function(err) {
      vm.posting = false;
      console.log(err);
      usSpinnerService.stop('spinner-1');
    });
  }
}
