var ibisServices = angular.module('ibisServices', []);
// var baseUrl = 'http://localhost:5000/api';
var baseUrl = 'https://uiuc-ibis.herokuapp.com/api';
ibisServices.factory('Users', function($http, $window) {
    return {
        post : function(data) {
            return $http.post(baseUrl+'/users', data);
        },
        get : function(userID) {
            return $http.post(baseUrl+'/users'+userID);
        }
    }
});