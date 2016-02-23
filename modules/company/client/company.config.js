'use strict';

angular.module('company').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('company.settings.menu', {
      title: 'Profile',
      state: 'company.navbar.settings.profile',
      class: '',
      roles: ['*'],
      position: 1
    });
  }
]);
