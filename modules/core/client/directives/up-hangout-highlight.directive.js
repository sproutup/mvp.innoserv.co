'use strict';

angular
  .module('core')
  .directive('upHangoutHighlight', upHangoutHighlight);

function upHangoutHighlight() {
  var directive = {
    templateUrl: 'modules/core/client/directives/up-hangout-highlight.html',
    scope: {
      hangout: '='
    }
  };

  return directive;

}