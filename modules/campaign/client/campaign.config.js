'use strict';

angular.module('campaign').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'DISCOVER',
      state: 'navbar.discover.list',
      class: 'campaign',
      roles: ['*'],
      position: 10
    });
    Menus.addMenuItem('user.profile.menu', {
      title: 'Activities',
      state: 'navbar.user.activities',
      roles: ['*'],
      position: 10
    });
  }
]);
