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
    console.log('init');
    $scope.loadUser = null;
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
  };

  $scope.getInfo = function(email){
    Users.get(email).success(function(res){
      $scope.loadUser = res.success;
      $scope.form = res.data;
    }).error(function(err){
      $scope.loadUser = err.success;
    });
  };

  $scope.update = function(form){
    Users.put(form).success(function(res){
      $scope.update = res;
    }).error(function(err){
      $scope.update = err;
    });
  };

}]);