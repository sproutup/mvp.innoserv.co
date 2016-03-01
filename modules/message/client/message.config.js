'use strict';

angular.module('message').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'MESSAGES',
      state: 'navbar.conversation.list',
      class: '',
      roles: ['user', 'admin'],
      position: 100
    });
  }
]);
