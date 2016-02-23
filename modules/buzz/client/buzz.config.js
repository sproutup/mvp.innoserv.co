'use strict';

angular.module('buzz').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'HOME',
      state: 'navbar.home',
      class: 'buzz',
      roles: ['guest', 'user', 'admin'],
      position: 10
    });
  }
]);
