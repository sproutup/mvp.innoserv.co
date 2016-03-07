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
      if (ctrl.$isEmpty(modelValue)) {
        // consider empty model valid
        return $q.when();
      }

      var def = $q.defer();
      var str = modelValue;
      var res = str.match(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/);

      if (res && res[0]) {
        scope.item.url = res[0];
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

      return def.promise;
    };
  }
}
