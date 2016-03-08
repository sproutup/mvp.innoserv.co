'use strict';

angular
  .module('core')
  .directive('upEmbed', upEmbed);

upEmbed.$inject = ['$q', '$timeout', '$http'];

function upEmbed($q, $timeout, $http) {
  var directive = {
    require: 'ngModel',
    link: linkFunc
  };

  return directive;

  function linkFunc(scope, el, attr, ctrl) {
    ctrl.$asyncValidators.upEmbed = function(modelValue, viewValue) {
      var def = $q.defer();

      // Check if we already have meta data, otherwise continue
      if (scope.item.meta) {
        def.resolve();
      } else {
        run();
      }

      function run() {
        if (ctrl.$isEmpty(modelValue)) {
          // Consider empty model valid
          return $q.when();
        }

        var str = modelValue;
        var res = str.match(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/);

        // If the URL starts with 'www', prepend 'http://'
        if (res && res[0]) {
          var index = res[0].indexOf('www');
          if (index === 0) {
            scope.item.url = 'http://' + res[0];
          } else {
            scope.item.url = res[0];
          }
        }

        // If we find a URL, query for meta data
        if (scope.item.url) {
          $http.post('/api/meta', {url: scope.item.url}).success(function (response) {
            if (response) {
              scope.item.meta = response;
              def.resolve();
            } else {
              scope.item.meta = null;
              def.reject();
            }
          }).error(function (response) {
            scope.item.meta = null;
            def.resolve();
          });
        } else {
          scope.item.url = null;
          scope.item.meta = null;
          def.resolve();
        }
      }

      return def.promise;
    };
  }
}
