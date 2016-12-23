var ibisControllers = angular.module('ibisControllers', []);

ibisControllers.controller('registerController', ['$scope', 'Users', function($scope, Users) {
  $scope.form = {
    'email' : null,
    'firstName' : null,
    'lastName' : null,
    'password' : null,
    'ConfirmPassword': null,
    'club' : null,
    'size' : 'Small',
    'gender' : 'Male',
    'single' : {
      'entry' : false,
      'level' : 'A'
    },
    'double' : {
      'entry' : false,
      'level' : 'A',
      'firstName': null,
      'lastName': null
    },
    'mixed' : {
      'entry' : false,
      'level' : 'A',
      'firstName': null,
      'lastName': null
    }
    
  };

  $scope.submit = function(form){
    console.log('submit');
    Users.post(form).success(function(res){
      console.log(res);
    }).error(function(err){
      console.log(err);
    });
  }

}]);