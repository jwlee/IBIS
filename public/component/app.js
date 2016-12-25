var app = angular.module('ibis', ['ngRoute', 'ibisControllers','ibisServices']);

app.config(['$routeProvider', function($routeProvider) {
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
    redirectTo: '/settings'
  });
}]);
