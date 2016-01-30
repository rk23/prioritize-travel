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
      '/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'HomeCtrl'
      }
    )
    .when(
    '/deal', {
      templateUrl: 'app/views/deal.html',
      controller: 'HomeCtrl'
      }
    );
  //$locationProvider.html5Mode(true);
}]);
