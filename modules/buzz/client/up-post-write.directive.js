'use strict';

angular
  .module('buzz')
  .directive('upPostWrite', upPostWrite);

function upPostWrite() {
  var directive = {
    require: 'ngModel',
    scope: {
      min: '=',
      max: '=',
      ngModel: '=',
      ngDisabled: '='
    },
    link: linkFunc,
    template: '<textarea ng-model="item.body" ng-change="onChange()" up-embed ng-model-options="{ debounce: 250 }" name="content" placeholder="What do you have in mind? A cool product video? Good stuff for others to bite on?" class="form-control post-new-textarea link" required></textarea>'
  };

  return directive;

  function linkFunc(scope, element, attrs, ngModel) {
    scope.item = {
      body: ''
    };
    ngModel.$valid = false;

    scope.onChange = function(){
      ngModel.$setViewValue(scope.item);
    };

    ngModel.$render = function() {
      console.log('render', scope);
      // scope.item = ngModel.$viewValue;
    };
  }
}
