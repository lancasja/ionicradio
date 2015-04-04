angular.module('radioLive.controllers', [])

/* ===================== */
/* == MAIN CONTROLLER == */
/* ===================== */
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  /*
    Login functionality here by default.
  */

  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

/* ============================= */
/* == AUDIO STREAM CONTROLLER == */
/* ============================= */
.controller('StreamCtrl', function($scope, $http, $cordovaMedia) {

  /*
    HTML5 Audio
    [https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement]

    Cordova Background Audio
    [http://plugins.cordova.io/#/package/com.cordova.background-audio]
  */

  /*
    Url taken from PLS file downloaded from SHOUTcast
    [http://yp.shoutcast.com/sbin/tunein-station.pls?id=172366]

    - TODO: Request the PLS file and parse it's contents to get the Url. Right now I'm just downloading the file, opening it in a text editor and getting the Url. But it seems the server IP changes every now and then.
  */
  var url = 'http://209.95.38.207:8000/';
  var audioUrl = url + ';type=mp3';
  var metaUrl = url + 'stats?sid=1';

  var stream = new Audio(audioUrl);

  /*
    Get metadata from SHOUTcast server
    [http://learn.ionicframework.com/formulas/backend-data/]
  */
  var getMeta = function() {
    $http.get(metaUrl)
      .success(function(data) {

        // TODO: Implement x2js [https://code.google.com/p/x2js/]
        var title = data.substring(data.indexOf('<SONGTITLE>') + 11, data.indexOf('</SONGTITLE>'));

        // Add to scope to use in view
        $scope.metadata = title;
      })
      .error(function(errData) {
        alert("Sorry, we can't get the currently playing info for you at the moment.");
        console.log('ERROR getting data from [ ' + metaUrl + ' ]:\n' + errData);
      });
  }

  // Set metadata right off the bat
  getMeta();

  // Update metadata every 5 seconds
  setInterval(getMeta, 5000);

  /* TODO:
      - Make these a Play/Pause button
      - Add a rewind button
  */
  // Play button
  $scope.playStream = function() {  
    if (stream.paused) {
      stream.play();
    }
  };

  // Pause button
  $scope.pauseStream = function() {
    if (!stream.paused) {
      stream.pause();
    }
  };
})

/* ============================= */
/* == EPISODE LIST CONTROLLER == */
/* ============================= */
.controller('EpisodesCtrl', function($scope, $http) {

  $scope.init = function() {
    // Ping Google Feed API
    $http.get('http://ajax.googleapis.com/ajax/services/feed/load', {
      params: {
        'v': '1.0',
        'q': 'http://420radio.org/shows/rbs/feed/',
        'num': '10'
      }
    })
    .success(function(data) {
      $scope.rssTitle = data.responseData.feed.title;
      $scope.entries = data.responseData.feed.entries;
    })
    .error(function(data) {
      console.log(data);
    });
  };

  $scope.openLinkInWebView = function(url) {
    window.open(url, '_blank', 'location=no');
  }
})

/* =============================== */
/* == SINGLE EPISODE CONTROLLER == */
/* =============================== */
.controller('EpisodeCtrl', function($scope, $stateParams) {

  var audio = new Audio();

});






















