/**
 * Created by ReedK on 1/29/16.
 */
angular.module('HackathonCtrls', [])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    $rootScope.bgimg = "home_body";
    $scope.weekly = 0;

    $rootScope.isLoggedIn = false;

    $scope.logout = function() {
      $http.get('/auth/logout').then(
        function success(res){
          $rootScope.loggedIn = false;
          $location.path('/')
        },
        function error(res){
          console.log('error')
        }
      )
    }

  }])
  .controller('SignupCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $scope.user = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };

    $scope.userSignup = function() {

      $http({
        method: 'POST',
        url: 'auth/register',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: $scope.user
      }).success(function (res) {
        console.log('success')
        $rootScope.loggedIn = true;
        $location.path('/')
      }).error(function(res) {
        console.log(res);
      });

    }

  }])
  .controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $scope.user = {
      email: '',
      password: ''
    }

    $scope.userLogin = function(){

      $http({
        method: 'POST',
        url: 'auth/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: $scope.user
      }).success(function (res) {
        $rootScope.loggedIn = true;
        $location.path('/')
      }).error(function(res) {
        console.log(res);
      });

    }
  }])
  .controller('UserCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $scope.user = {
      email: '',
      password: ''
    }

    $scope.userLogin = function(){

      $http({
        method: 'POST',
        url: 'auth/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: $scope.user
      }).success(function (res) {
        $rootScope.loggedIn = true;
        $location.path('/')
      }).error(function(res) {
        console.log(res);
      });

    }
  }]);
