'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$analyticsProvider',
  function ($analyticsProvider) {
    $analyticsProvider.virtualPageviews(false);
    $analyticsProvider.firstPageview(true);
    $analyticsProvider.withBase(true);
  }
]);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$sceDelegateProvider',
  function ($locationProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://www.youtube.com/**'
    ]);
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(function ($urlRouterProvider) {
  // if the path doesn't match any of the urls you configured
  // otherwise will take care of routing the user to the
  // specified url
//  $urlRouterProvider.otherwise('/index');

  // Example of using function rule as param
//  $urlRouterProvider.otherwise(function ($injector, $location) {
//    return '/a/valid/url';
//  });
});

// Setting spinner defaults
angular.module(ApplicationConfiguration.applicationModuleName).config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
  usSpinnerConfigProvider.setDefaults({
    lines: 8, // The number of lines to draw
    length: 16, // The length of each line
    width: 23, // The line thickness
    radius: 42, // The radius of the inner circle
    scale: 0.13, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: 'white', // #rgb or #rrggbb or array of colors
  });
}]);

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state, Authentication) {
  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        $state.go('authentication.signin', {}, {
          notify: false
        }).then(function () {
          $rootScope.$broadcast('$stateChangeSuccess', 'authentication.signin', {}, toState, toParams);
        });
      }
    }

    /* jshint ignore:start */
    if (Authentication.user && Authentication.user.id) {
      // console.log('Start Intercom');
      // console.log('Intercom with logged-in user: ', Authentication.user.displayName);
      Intercom('boot', {
        app_id: 'nwdbju9h',
        email: Authentication.user.email,
        name: Authentication.user.displayName,
        user_id: Authentication.user.id,
        application: 'SproutUp'
      });
    } else {
      // console.log('Start Intercom');
      // console.log('Intercom with logged-out user');
      Intercom('boot', {
        app_id: 'nwdbju9h',
        application: 'SproutUp'
      });
    }
    /* jshint ignore:end */
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log('stateChangeSuccess: ', toState.name);
    $state.previous = {
      state: fromState,
      params: fromParams,
      href: $state.href(fromState, fromParams)
    };
  });

  $rootScope.$on('$stateChangeError',
  function(event, toState, toParams, fromState, fromParams, error){
    console.log('stateChangeError: ', toState.name, error);
  });
});

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
