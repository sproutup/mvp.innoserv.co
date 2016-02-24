'use strict';

angular.module('hangout').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'HANGOUT',
      state: 'navbar.hangout.list.future',
      class: 'hangout',
      roles: ['guest','user', 'admin'],
      position: 30
    });
  }
]);
