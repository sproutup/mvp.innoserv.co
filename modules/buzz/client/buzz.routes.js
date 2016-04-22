'use strict';

angular
  .module('buzz')
  .config(buzzConfig);

function buzzConfig($stateProvider) {
  $stateProvider
    .state('navbar.singleBuzz' ,{
      url: '/buzz/:id',
      templateUrl: 'modules/buzz/client/single-buzz.html',
      controller: 'BuzzController',
      controllerAs: 'vm',
      data: {
          title: 'Buzz'
      }
    })
    .state('navbar.home' ,{
      url: '/',
      templateUrl: 'modules/buzz/client/buzz.html',
      controller: 'BuzzController',
      controllerAs: 'vm',
      data: {
          title: 'Buzz'
      }
    })
    .state('navbar.slug.user.buzz' ,{
      url: '/buzz',
      templateUrl: 'modules/buzz/client/user-buzz.html',
      controller: 'BuzzController',
      controllerAs: 'buzz',
      data: {
          title: 'Buzz'
      }
    });
}
