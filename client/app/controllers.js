/**
 * Created by ReedK on 1/29/16.
 */
angular.module('HackathonCtrls', ['HackathonServices'])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$http', '$routeParams', function($scope, $rootScope, $location, $http, $routeParams) {
    $rootScope.bgimg = "home_body";
    $rootScope.weekly;
    $scope.income;
    $scope.percentage;

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

    $rootScope.airport = {};

    $scope.search = function(airport, amount) {
      var checked_airport = {
        origin: airport.origin.toUpperCase(),
        destination: airport.destination.toUpperCase()
      }
      $http({
        url: 'http://localhost:3000/api/average/',
        method: "POST",
        data: checked_airport,
      }).then(function success(data){
        if (data.data.average) {
          $rootScope.weekly = amount;
          $rootScope.average = data.data.average;
          $location.path("/deal");
        } else {
          $location.path("/");
        }
      }).then(function error(data){

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
        function success(res) {
            $scope.user = res.data;
          if($scope.user) {
            $scope.user.bank.savings = 0;
          }
        },
        function error() {
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
    $scope.to = $scope.airport.origin;
    $scope.from = $scope.airport.destination;
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

    $scope.popularSearch = function() {
      var checked_airport = {
        origin: "SEA",
      }
      console.log(checked_airport);
      $http({
        url: 'http://localhost:3000/api/thing/',
        method: "POST",
        data: checked_airport,
      }).then(function success(data){
        $rootScope.weekly = $scope.savedPerWeek;
        $rootScope.deals = data.data.results;
        $location.path('/popular');
        console.log(data);
      }).then(function error(data){
        console.log(data);
      });
    };

  }])
  .controller('PopularCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $rootScope.bgimg = "popular_body";
    $scope.popular = $rootScope.deals;
    $scope.savedPerWeek = $rootScope.weekly;
  }])
  .controller('UnrealCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    $scope.unrealSearch = function() {
      var checked_airport = {
        origin: 'SEA',
        destination: 'LAX'
      }
      console.log(checked_airport);
      $http({
        url: 'http://localhost:3000/api/deals',
        method: "POST",
        data: checked_airport,
      }).then(function success(data){
        $rootScope.weekly = $scope.savedPerWeek;
        $rootScope.unrealDeals = data.data.unrealDeals;
        $scope.unreal = $rootScope.unrealDeals;
        console.log($rootScope.unrealDeals);
      }).then(function error(data){
        console.log(data);
      });
    };

    $rootScope.bgimg = "unreal_body";

    $scope.savedPerWeek = $rootScope.weekly;
  }]);
