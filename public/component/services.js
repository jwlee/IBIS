var ibisServices = angular.module('ibisServices', []);
// var baseUrl = 'http://localhost:5000/api';
var baseUrl = 'https://uiuc-ibis.herokuapp.com/api';


ibisServices.factory('Users', function($http, $window) {
  return {
    post : function(data) {
        return $http.post(baseUrl+'/users', data);
    },
    get : function(userEmail) {
        return $http.get(baseUrl+'/users/?email='+userEmail);
    },
    put : function(data) {
        return $http.put(baseUrl+'/users', data);
    }
  }
});


ibisServices.factory('Admin', function($http, $window) {
  return {
    post : function(password) {
        return $http.post(baseUrl+'/admin', password);
    }
  }
});