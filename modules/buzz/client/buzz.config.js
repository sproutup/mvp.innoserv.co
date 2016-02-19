'use strict';

angular.module('buzz').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'Buzz',
      state: 'user.buzz',
      class: 'buzz',
      roles: ['user', 'admin'],
      position: 10
    });
  }
]);
