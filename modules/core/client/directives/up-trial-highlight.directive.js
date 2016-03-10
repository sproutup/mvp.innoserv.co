'use strict';

angular
    .module('core')
    .directive('upTrialHighlight', upTrialHighlight);

function upTrialHighlight() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'modules/core/client/directives/up-trial-highlight.html',
        scope: {
            campaign: '='
        },
        link: linkFunc,
        controller: UpTrialHighlightController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attr, ctrl) {
        // linkFunc
    }
}

function UpTrialHighlightController() {
  var vm = this;

}