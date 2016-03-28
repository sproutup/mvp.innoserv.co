'use strict';

angular
  .module('slug')
  .directive('upSlug', SlugDirective);

SlugDirective.$inject = ['$q', '$timeout', '$http', 'SlugService'];

function SlugDirective($q, $timeout, $http, SlugService) {
  var directive = {
    require: 'ngModel',
    link: linkFunc,
  };

  return directive;

  function linkFunc(scope, el, attr, ctrl) {
    ctrl.$asyncValidators.uniqueslug = function(modelValue, viewValue) {
      if (ctrl.$isEmpty(modelValue)) {
        // consider empty model valid
        return $q.when();
      }

      var def = $q.defer();
      var slug = modelValue;

      SlugService.check(slug).then(function (response) {
        if(response.data.ok){
          def.resolve();
        }
        else{
          def.reject();
        }
      }).catch(function (response) {
         def.reject();
      });

      return def.promise;
    };
  }
}
