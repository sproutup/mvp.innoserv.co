'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'mean';
  var applicationModuleVendorDependencies = [
    'ngResource',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ngMessages',
    'ui.validate',
    'chart.js',
    'angularMoment',
    'ngCookies',
    'ngFileUpload',
    'luegg.directives',
    'angularSpinner',
    'ngSanitize',
    'videosharing-embed',
    'angulartics',
    'angulartics.google.analytics',
    'angulartics.mixpanel',
    'angulartics.intercom',
    'ngIntlTelInput',
    'ngAutocomplete',
    'infinite-scroll',
    'ngLodash'
  ];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();
