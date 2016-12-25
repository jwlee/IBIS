var ibisControllers = angular.module('ibisControllers', []);

ibisControllers.controller('registerController', ['$scope', 'Users', function($scope, Users) {
  init();

  function init() {
    $scope.loading = false; 
    $scope.form = {
      'email' : null,
      'firstName' : null,
      'lastName' : null,
      'birthdate' : null,
      'club' : null,
      'size' : 'Small',
      'gender' : 'Male',
      'phone' : null,
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
  }

  $scope.partnerName = function(){
    if ($scope.form.double.entry == false){
      $scope.form.double.firstName = null;
      $scope.form.double.lastName = null; 
    }
    if ($scope.form.mixed.entry == false){
      $scope.form.mixed.firstName = null;
      $scope.form.mixed.lastName = null; 
    }
  }

  $scope.submit = function(form){
    $scope.loading = true;
    Users.post(form).success(function(res){
      init();
      $scope.loading = false;
      $scope.result = res;
    }).error(function(err){
      $scope.loading = false;
      $scope.result = err;
    });
  }

}]);

ibisControllers.controller('statusController', ['$scope', 'Users', function($scope, Users) {
  $scope.init;

  $scope.init = function(){
    $scope.loadUser = null;
  }

  $scope.partnerName = function(){
    if ($scope.loadUser.data.double.entry == false){
      $scope.loadUser.data.double.firstName = null;
      $scope.loadUser.data.double.lastName = null; 
    }
    if ($scope.loadUser.data.mixed.entry == false){
      $scope.loadUser.data.mixed.firstName = null;
      $scope.loadUser.data.mixed.lastName = null; 
    }
  };

  $scope.getInfo = function(email){
    Users.get(email).success(function(res){
      $scope.loadUser = res;
      console.log(res);
    }).error(function(err){
      $scope.loadUser = err;
      console.log(err);
    });
  };

  $scope.update = function(data){
    Users.put(data).success(function(res){
      $scope.update = res;
    }).error(function(err){
      $scope.update = err;
    });
  };

}]);