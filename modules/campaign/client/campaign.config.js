'use strict';

angular.module('campaign').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'DISCOVER',
      state: 'navbar.discover.list',
      class: 'campaign',
      roles: ['guest','user', 'admin'],
      position: 20
    });
  }
]);
