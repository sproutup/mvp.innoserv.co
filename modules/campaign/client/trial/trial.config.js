'use strict';

angular.module('campaign').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('company.navbar.campaign.trial.view.menu', {
      title: 'Requests',
      state: 'company.navbar.campaign.trial.view.requests',
      class: '',
      roles: ['*']
    });

    Menus.addMenuItem('company.navbar.campaign.trial.view.menu', {
      title: 'Stats',
      state: 'company.navbar.campaign.trial.view.stats',
      class: '',
      roles: ['*']
    });

    Menus.addMenuItem('company.navbar.campaign.trial.view.menu', {
      title: 'Configuration',
      state: 'company.navbar.campaign.trial.view.configure',
      class: '',
      roles: ['*']
    });
  }
]);
