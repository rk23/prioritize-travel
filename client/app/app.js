var app = angular.module('PrioritizeTravel', ['ngRoute', 'HackathonCtrls']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when(
      '/', {
        templateUrl: 'app/views/random.html',
        controller: 'HomeCtrl'
      }
    );

  //$locationProvider.html5Mode(true);
}]);
