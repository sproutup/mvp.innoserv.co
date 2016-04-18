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
      if (scope.vm.item.meta) {
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
            scope.vm.item.url = 'http://' + res[0];
          } else {
            scope.vm.item.url = res[0];
          }
        }

        // If we find a URL, query for meta data
        if (scope.vm.item.url) {
          $http.post('/api/meta', {url: scope.vm.item.url}).success(function (response) {
            if (response) {
              scope.vm.item.meta = response;
              def.resolve();
            } else {
              scope.vm.item.meta = null;
              def.reject();
            }
          }).error(function (response) {
            scope.vm.item.meta = null;
            def.resolve();
          });
        } else {
          scope.vm.item.url = null;
          scope.vm.item.meta = null;
          def.resolve();
        }
      }

      return def.promise;
    };
  }
}
