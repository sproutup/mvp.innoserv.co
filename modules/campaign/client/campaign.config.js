'use strict';

angular.module('campaign').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'DISCOVER',
      state: 'navbar.discover.list',
      class: 'campaign',
      roles: ['*'],
      position: 20
    });
    Menus.addMenuItem('user.profile.menu', {
      title: 'Activities',
      state: 'navbar.slug.user.activities',
      roles: ['*'],
      position: 10
    });
  }
]);
