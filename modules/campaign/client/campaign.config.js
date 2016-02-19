'use strict';

angular.module('campaign').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('navbar', {
      title: 'Discover',
      state: 'user.navbar.campaign.list',
      class: 'campaign',
      roles: ['user', 'admin'],
      position: 1
    });
  }
]);
