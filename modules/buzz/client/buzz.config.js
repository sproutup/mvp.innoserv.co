'use strict';

angular.module('buzz').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'BUZZ',
      state: 'navbar.home',
      roles: ['*'],
      position: 10
    });
    Menus.addMenuItem('user.profile.menu', {
      title: 'Buzz',
      state: 'navbar.slug.user.buzz',
      roles: ['*'],
      position: 10
    });
  }
]);
