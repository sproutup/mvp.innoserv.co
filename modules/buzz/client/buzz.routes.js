'use strict';

angular
    .module('buzz')
    .config(config);

function config($stateProvider) {

    $stateProvider
        .state('singleBuzz' ,{
            url: '/buzz/:id',
            templateUrl: 'modules/buzz/client/single-buzz.html',
            controller: 'BuzzController',
            controllerAs: 'vm',
            data: {
                title: 'Buzz - SproutUp'
            }
        })
        .state('buzz' ,{
            url: '/buzz',
            templateUrl: 'modules/buzz/client/buzz.html',
            controller: 'BuzzController',
            controllerAs: 'vm',
            data: {
                title: 'Buzz - SproutUp'
            }
        });
}
