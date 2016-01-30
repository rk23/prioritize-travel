/**
 * Created by ReedK on 1/29/16.
 */
angular.module('HackathonCtrls', [])
.controller('MainCtrl', ['$scope', function($scope){
  $scope.pageClass = 'page-home';
}])
.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.bgimg = "home_body";
  $scope.pageClass = 'page-home';
  $scope.weekly = 0;

  $scope.tabs = [
    {title: 'Set Amount', wk_amount: ''},
    {title: 'Percentage', income: 'Dynamic content 2', percentage: ''}
  ];
  }]);
