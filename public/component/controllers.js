var ibisControllers = angular.module('ibisControllers', []);

ibisControllers.controller('registerController', ['$scope', 'Users', function($scope, Users) {
  init();

  function init() {
    $scope.loading = false; 
    $scope.form = {
      'email' : null,
      'firstName' : null,
      'lastName' : null,
      'password': null,
      'passwordConfirm': null,
      'age' : null,
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
        'firstName': '',
        'lastName': ''
      },
      'mixed' : {
        'entry' : false,
        'level' : 'A',
        'firstName': '',
        'lastName': ''
      }
    };
  }

  $scope.partnerName = function(){
    if ($scope.form.double.entry == false){
      $scope.form.double.firstName = '';
      $scope.form.double.lastName = ''; 
    }
    if ($scope.form.mixed.entry == false){
      $scope.form.mixed.firstName = '';
      $scope.form.mixed.lastName = ''; 
    }
  }

  $scope.submit = function(form){
    $scope.loading = true;
    if (form.password == form.passwordConfirm){
      Users.post(form).success(function(res){
        init();
        $scope.loading = false;
        $scope.result = res;
      }).error(function(err){
        $scope.loading = false;
        $scope.result = err;
      });
    }
    else{
      $scope.result = {'success': false, 'message':'Password is not matching.'};
    }
  }

}]);

ibisControllers.controller('statusController', ['$scope', '$anchorScroll' ,'Users', function($scope, $anchorScroll, Users) {
  $scope.init;

  $scope.init = function(){
    $scope.loadUser = null;
    $scope.loading = false; 
  }

  $scope.partnerName = function(){
    if ($scope.loadUser.data.double.entry == false){
      $scope.loadUser.data.double.firstName = '';
      $scope.loadUser.data.double.lastName = ''; 
    }
    if ($scope.loadUser.data.mixed.entry == false){
      $scope.loadUser.data.mixed.firstName = '';
      $scope.loadUser.data.mixed.lastName = ''; 
    }
  };

  $scope.getInfo = function(email){
    $scope.loading = true; 
    Users.get(email).success(function(res){
      $scope.loadUser = res;
      $scope.loadUser.data.password = null;
      $scope.loading = false; 
      scrollUp();
    }).error(function(err){
      $scope.loadUser = err;
      $scope.loading = false;
      scrollUp(); 
    });
  };

  $scope.updateInfo = function(data){
    $scope.loading = true; 
    Users.put(data).success(function(res){
      $scope.update = res;
      $scope.loadUser.data.password = null;
      $scope.loading = false; 
      scrollUp();
    }).error(function(err){
      $scope.update = err;
      $scope.loading = false; 
      scrollUp();
    });
  };

  function scrollUp () {
    $anchorScroll();
  };

}]);