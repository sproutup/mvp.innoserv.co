'use strict';

angular
  .module('content')
  .directive('upReachGraph', upReachGraph);

function upReachGraph() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/users/client/up-reach-graph.html',
    scope: {
      user: '=',
    },
    link: linkFunc,
    controller: UpReachGraphController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

  function linkFunc(scope, element, attr, ctrl) {

  }
}

UpReachGraphController.$inject = ['$scope', 'MetricService'];

function UpReachGraphController($scope, MetricService) {
  var vm = this;

  MetricService.metrics().get({
    userId: vm.user.id
  }, function(res) {
    vm.data = [];
    vm.labels = [];
    vm.total = 0;

    for (var key in res) {
      if (res[key].metrics && res[key].metrics.followers) {
        vm.user.metrics = true;
        vm.data.push(res[key].metrics.followers);
        vm.total += res[key].metrics.followers;
        if (res[key].service === 'googleplus') {
          vm.labels.push('Google+');
        } else if (res[key].service === 'youtube') {
          vm.labels.push('YouTube');
        } else {
          vm.labels.push(capitalizeFirstLetter(res[key].service));
        }
      }
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  });
}