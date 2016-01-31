/**
 * Created by ReedK on 1/29/16.
 */
angular.module('HackathonCtrls', ['HackathonServices'])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    $rootScope.bgimg = "home_body";
    $scope.weekly = 0;
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
        $scope.user.bank.savings = 0;
      },
      function error(){
        console.log('userctrl error')
      }
    )

    $scope.updateDaily = function(savings, user){
      if (!savings) savings = 0;
     $scope.user.bank.pendingDeposit += savings;
      $http({
        method: 'POST',
        url: '/user/updateDaily',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {savings: savings}
      }).success(function (res) {
        console.log('success updating daily')
        console.log(res)
      }).error(function (res) {
        console.log(res);
      });

    }

  }])
  .controller('DealCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $rootScope.bgimg = "user_body";
    $scope.savedPerWeek = 40;
    $scope.price = 2800;

    console.log("moo");


    var monthsNeeded = function(savedPerWeek, price){
      console.log("moo2");
      return price/savedPerWeek;
    };


  }]);
