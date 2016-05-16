'use strict';

angular.module('users').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('settings', {
      title: 'Profile',
      state: 'navbar.settings.profile',
      class: '',
      roles: ['*'],
      position: 10
    });

    Menus.addMenuItem('settings', {
      title: 'Social Networks',
      state: 'navbar.settings.accounts',
      class: '',
      roles: ['*'],
      position: 20
    });

    Menus.addMenuItem('settings', {
      title: 'Get Paid',
      state: 'navbar.settings.payment',
      class: '',
      roles: ['*'],
      position: 30
    });
  }
]);

