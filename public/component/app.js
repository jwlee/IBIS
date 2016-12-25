var app = angular.module('ibis', ['ngRoute', 'ibisControllers','ibisServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: "partials/home.html",
  }).
  when('/about', {
    templateUrl: "partials/about.html",
  }).
  when('/tournament', {
    templateUrl: "partials/tournament.html",
  }).
  when('/status', {
    templateUrl: "partials/status.html",
    controller: "statusController"
  }).
  when('/register', {
    templateUrl: "partials/register.html",
    controller: "registerController"
  }).
  otherwise({
    redirectTo: '/'
  });

  // use the HTML5 History API
  // $locationProvider.html5Mode({ enabled: true, requireBase: false });

}]);
