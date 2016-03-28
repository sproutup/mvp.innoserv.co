'use strict';

angular
  .module('suggest')
  .directive('upSuggestion', upSuggestion);

function upSuggestion() {
  var directive = {
    scope: {
      suggestion: '=',
    },
    templateUrl: 'modules/suggest/client/up-suggestion.template.html'
  };

  return directive;
}
