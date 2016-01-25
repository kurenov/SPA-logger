/*
 * SPA-logger
 * by Olzhas Kurenov
 * Single Page Application Page Logger (MEAN Stack)
 * API for log set & get
 */

var mainApp = angular.module('mainApp', ['ngRoute', 'routeStyles']);
mainApp.config(function ($routeProvider) {
  $routeProvider
          .when('/', {
            controller: '',
            templateUrl: ''
          })          
          .otherwise({
            redirectTo: '/'
          });
});

var logController = function ($scope, logFactory, $window, $location) {
  
  $scope.log = function (page) {
    var navigator = {
      language: $window.navigator.language,
      platform: $window.navigator.platform,
      vendor: $window.navigator.vendor
    };
    logFactory.log({page:page,navigator:navigator}).then(
            function successCallback(res) {
              console.log('Log successful');
            },
            function errorCallback(res) {
              console.log('Log failed');
            });
  };

  $scope.$on("$routeChangeSuccess", function (currentRoute, previousRoute) {
    $scope.log($location.url());
  });
};

logController.$inject = ['$scope', 'logFactory', '$window', '$location'];
mainApp.controller('logController', logController);
