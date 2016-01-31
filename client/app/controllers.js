/**
 * Created by ReedK on 1/29/16.
 */
angular.module('HackathonCtrls', ['HackathonServices'])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$http', '$routeParams', function($scope, $rootScope, $location, $http, $routeParams) {
    $rootScope.bgimg = "home_body";
    $rootScope.weekly;
    $scope.income = 0;
    $scope.percentage = 0;

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

    $rootScope.airport = {
      origin: '',
      destination: ''
    };

    $scope.search = function(weekly) {
      $rootScope.airport = {
        origin: $rootScope.airport.origin,
        destination: $rootScope.airport.destination
      };
      console.log(weekly);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/average',
        data: $scope.master,
      }).success(function(data){
        console.log(data);
        $rootScope.weekly = weekly;
        $rootScope.average = data.average;
        $location.path("/deal");
      }).error(function(data){
        console.log(data);
      });
    };

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
      username: '',
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
        $rootScope.username = $scope.user.username;
        $location.path('/')
      }).error(function(res) {
        console.log(res);
      });

    }
  }])
  .controller('UserCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $rootScope.bgimg = "user_body";

    $http.get('/auth/currentUser').then(
      function success(res){
        $scope.user = res.data;
        console.log(res.data)
      },
      function error(){
        console.log('userctrl error')
      }
    )
  }])
  .controller('DealCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $scope.to = $rootScope.airport.origin;
    $scope.from = $rootScope.airport.destination;
    $rootScope.bgimg = "deal_body";
    $scope.savedPerWeek = $scope.weekly;
    $scope.price = Math.floor($scope.average);

    $scope.monthsNeeded = function(savedPerWeek, price){
      var saved = $scope.savedPerWeek;
      var price = $scope.price;
      var time = price / saved;

      if (time < 4) {
        return Math.floor(time);
      } else {
        var months = time / 4;
        return Math.floor(months);
      }
    };


  }]);
