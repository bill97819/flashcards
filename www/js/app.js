
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.quiz', {
    url: '/quiz',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-quiz.html',
        controller: 'QuizCtrl'
      }
    }
  })
  .state('tab.start', {
    url: '/quiz/start',
    views: {
      'tab-dash': {
        templateUrl: 'templates/quiz.html',
        controller: 'StartCtrl'
      }
    }
  })
  
  .state('tab.manage', {
      url: '/manage',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-manage.html',
          controller: 'ManageCtrl'
        }
      }
    })
    .state('tab.deckedit', {
      url: '/manage/deckedit',
      views: {
        'tab-chats': {
          templateUrl: 'templates/deckedit.html',
          controller: 'DeckEditCtrl'
        }
      }
    })
  
  .state('tab.about', {
    url: '/about',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/quiz');
     $ionicConfigProvider.tabs.position('bottom');

});

