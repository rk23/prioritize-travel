/**
 * Created by ReedK on 1/29/16.
 */
var app = angular.module('HackathonApp', ['ngRoute', 'HackathonCtrls']);

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
