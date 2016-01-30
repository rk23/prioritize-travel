var app = angular.module('PrioritizeTravel', ['ngRoute', 'HackathonCtrls']);

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
    );

  //$locationProvider.html5Mode(true);
}]);
