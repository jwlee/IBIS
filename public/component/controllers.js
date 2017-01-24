var ibisControllers = angular.module('ibisControllers', []);

ibisControllers.controller('registerController', ['$scope', '$anchorScroll', '$location', 'Users', function($scope, $anchorScroll, $location, Users) {
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
        $scope.result = res;
        $location.path('/status');
        scrollUp();
      }).error(function(err){
        $scope.result = err;
        scrollUp();
      });
    }
    else{
      $scope.result = {'success': false, 'message':'Password is not matching.'};
      scrollUp ();
    }
  }

  function scrollUp () {
    $scope.loading = false; 
    $anchorScroll();
  };

}]);

ibisControllers.controller('statusController', ['$scope', '$anchorScroll' ,'Users', function($scope, $anchorScroll, Users) {
  $scope.init;

  $scope.init = function(){
    $scope.loadUser = null;
    $scope.loading = false; 
    $scope.email = null;
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
      scrollUp();
    }).error(function(err){
      $scope.loadUser = err;
      scrollUp(); 
    });
  };

  $scope.updateInfo = function(data){
    $scope.loading = true; 
    Users.put(data).success(function(res){
      $scope.update = res;
      scrollUp();
    }).error(function(err){
      $scope.update = err;
      scrollUp();
    });
  };

  function scrollUp () {
    $scope.loading = false; 
    $anchorScroll();
  };

}]);

ibisControllers.controller('adminController', ['$scope', '$location', 'Admin', function($scope, $location, Admin) {

  $scope.admin = function(password){
    Admin.post({'password':password}).success(function(res){
      $scope.result = res;
      $scope.data = res.data;
      $scope.password = null;
      $scope.headlines = ['firstName','lastName','gender','phone','size','club','age','email','single.entry','single.level','double.entry','double.level','double.firstName','double.lastName','mixed.entry','mixed.level','mixed.firstName','mixed.lastName','created_at'];
    }).error(function(err){
      $scope.result = err;
    });
  };

}]);