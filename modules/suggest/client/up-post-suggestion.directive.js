'use strict';

angular
  .module('suggest')
  .directive('upPostSuggestion', upPostSuggestion);

function upPostSuggestion() {
  var directive = {
    controller: upPostSuggestionController,
    controllerAs: 'vm',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      ngDisabled: '='
    },
    link: linkFunc,
    templateUrl: 'modules/suggest/client/up-post-suggestion.template.html'
  };

  return directive;

  function linkFunc(scope, element, attrs, ngModel) {
    ngModel.$valid = false;

    scope.onChange = function(){
      ngModel.$setViewValue(scope.item);
    };

    ngModel.$render = function() {
      scope.item = ngModel.$viewValue;
    };
  }
}

upPostSuggestionController.$inject = ['Authentication', 'FeedService', 'usSpinnerService', '$state', 'SuggestService', 'PostService'];

function upPostSuggestionController(Authentication, FeedService, usSpinnerService, $state, SuggestService, PostService) {
  var vm = this;
  vm.item = {};
  vm.create = create;

  function create() {
    // If up-embed didn't find a url, use what's in the body
    if (vm.item.body && !vm.item.url) {
      vm.item.url = vm.item.body;
    }

    vm.posting = true;
    usSpinnerService.spin('spinner-1');
    var Suggest = SuggestService.suggest();
    var suggestItem = new Suggest({
      name: vm.item.name,
      url: vm.item.url
    });

    suggestItem.$save(function(res) {
      vm.post = {
        url: vm.item.url,
        body: vm.item.name,
        type: 1,
        refType: 'Suggest',
        refId: res.id,
        meta: vm.item.meta
      };

      createPost();
      vm.item = {};
    }, function(err) {
      console.log(err);
      usSpinnerService.stop('spinner-1');
    });
  }

  function createPost() {
    vm.posting = true;
    vm.post.userId = Authentication.user.id;
    var Post = PostService.post();
    var item = new Post(vm.post);
    item.$save(function(res) {
      vm.post = {};
      vm.posting = false;
      FeedService.model.posts.unshift(res);
      usSpinnerService.stop('spinner-1');
    }, function(err) {
      console.log(err);
      vm.posting = false;
      usSpinnerService.stop('spinner-1');
    });
  }

}