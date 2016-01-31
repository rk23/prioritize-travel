angular.module('HackathonServices', ['ngResource'])
  .factory('Auth', ['$http', function($http){
    return {
      currentUser: function(){return currentUser;}
    }
  }])
.factory('Average', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/average')
}]);
