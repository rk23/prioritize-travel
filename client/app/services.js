angular.module('HackathonServices', ['ngResource'])
  .factory('Auth', ['$http', function($http){
    return {
      currentUser: function(){return currentUser;}
    }
  }]);
