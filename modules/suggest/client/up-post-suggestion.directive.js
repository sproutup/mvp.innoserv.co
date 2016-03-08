'use strict';

angular
  .module('suggest')
  .directive('upPostSuggestion', upPostSuggestion);

function upPostSuggestion() {
  var directive = {
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
