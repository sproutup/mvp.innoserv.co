'use strict';

angular
  .module('core')
  .directive('upHttpPrefix', upHttpPrefix);

function upHttpPrefix() {
  var directive = {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      upHttpPrefix: '@'
    },
    link: function(scope, element, attrs, controller) {
      function ensureHttpPrefix(value) {
        if (!scope.upHttpPrefix) scope.upHttpPrefix = '';
        // If input starts with a @ then strip and prepend twitter url
        if (value) console.log('test:', scope.upHttpPrefix, value.indexOf('@'));
        if(value && value.indexOf('@') === 0) {
          controller.$setViewValue('http://' + scope.upHttpPrefix + value.slice(1) );
          controller.$render();
          return 'http://' + scope.upHttpPrefix + value.slice(1);
        }
        // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
        else if(value && !/^(https?):\/\//i.test(value) && 'http://'.indexOf(value) === -1 && 'https://'.indexOf(value) === -1) {
          controller.$setViewValue('http://' + scope.upHttpPrefix + value);
          controller.$render();
          return 'http://' + scope.upHttpPrefix + value;
        }
        else {
          return value;
        }
      }
      controller.$formatters.push(ensureHttpPrefix);
      controller.$parsers.push(ensureHttpPrefix);
    }
  };

  return directive;
}
