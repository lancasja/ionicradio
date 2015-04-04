/*
  420 Radio App
  Made with Ionic Framework
  v0.0.0
*/

/* ================== */
/* == GLOBAL SPACE == */
/* ================== */
// For creating, registering and retrieving Angular modules
// The 2nd parameter is an array of 'requires'
// 'radioLive.controllers' is found in controllers.js
// Installed ngCordova [http://ngcordova.com/]
var radioLiveApp = angular.module('radioLive', ['ionic', 'radioLive.controllers', 'ngCordova', 'ngSanitize']);

/* ============= */
/* == STARTUP == */
/* ============= */
radioLiveApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

/* ============ */
/* == ROUTES == */
/* ============ */
radioLiveApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.stream', {
    url: "/stream",
    views: {
      'menuContent': {
        templateUrl: "templates/stream.html",
        controller: 'StreamCtrl'
      }
    }
  })

  .state('app.legal', {
    url: "/legal",
    views: {
      'menuContent': {
        templateUrl: "templates/legal.html"
      }
    }
  })
    .state('app.episodes', {
      url: "/episodes",
      views: {
        'menuContent': {
          templateUrl: "templates/episodes.html",
          controller: 'EpisodesCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/episodes/:episodeId",
    views: {
      'menuContent': {
        templateUrl: "templates/episode.html",
        controller: 'EpisodeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stream');
});
