'use strict';

angular
  .module('file')
  .directive('upFileUpload', fileUpload);

fileUpload.$inject = ['$parse', '$timeout'];

function fileUpload($parse, $timeout) {
  var directive = {
    restrict: 'EA',
    require: '?ngModel',
    templateUrl: 'modules/file/client/file-upload.directive.html',
    link: linkFunc,
    controller: 'FileController',
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function linkFunc(scope, el, attr, ngModel) {
    console.log('LINK: file upload', attr.onChange);
    var vm = scope.vm;
    vm.model = ngModel;
    //var onupload = function(){};
//    if(attr.onUpload){
 var     onchange = $parse(attr.onChange);
//    }


    // update the color picker whenever the value on the scope changes
    ngModel.$render = function() {
      console.log('value changed');
      vm.file = ngModel.$viewValue;
      //element.val(ngModel.$modelValue);
      //element.change();
    };


    vm.onChange = function(){
      console.log('onSuccess');
      ngModel.$setViewValue(vm.file);
      $timeout(function(){
        scope.$apply(function () {
          onchange(scope);
        });
      });
    };
  }
}

