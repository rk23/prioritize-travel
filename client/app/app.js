var app = angular.module('PrioritizeTravel', ['ngRoute', 'HackathonCtrls', 'HackathonServices', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when(
      '/', {
        templateUrl: 'app/views/home.html',
        controller: 'HomeCtrl'
      }
    )
    .when(
      '/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'SignupCtrl'
      }
    )
    .when(
      '/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginCtrl'
      }
    )
    .when(
      '/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'UserCtrl'
      }
    )
    .when(
      '/deal', {
        templateUrl: 'app/views/deal.html',
        controller: 'DealCtrl'
      }
    )
    .when(
      '/popular', {
        templateUrl: 'app/views/popular.html',
        controller: 'PopularCtrl'
      }
    )
    .when(
      '/unreal', {
        templateUrl: 'app/views/unreal.html',
        controller: 'UnrealCtrl'
      }
    );
  // $locationProvider.html5Mode(true);
}]);
