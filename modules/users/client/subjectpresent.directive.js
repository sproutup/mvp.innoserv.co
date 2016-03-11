'use strict';

angular.module('users')
  .directive('subjectPresent', subjectPresent);

subjectPresent.$inject = ['$parse', 'Authentication', '$state'];

function subjectPresent($parse, Authentication, $state) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onPresent = $parse(attrs.subjectPresent);
      var onLogin = $parse(attrs.login);
      var state = attrs.state;

      element.on('click', function () {
        var params = scope.vm.params;
        if(Authentication.user.id){
          // The event originated outside of angular,
          // We need to call $apply
          scope.$apply(function () {
              onPresent(scope);
          });
        }
        else{
          scope.$apply(function () {
            onLogin(scope);
          });

          $state.transitionTo('authentication.signin');
        }
      });
    }
  };
}

