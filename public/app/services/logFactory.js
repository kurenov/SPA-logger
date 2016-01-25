var logFactory = function ($http) {

  var factory = {};
  
  factory.log = function(data) {
    return $http({
      url:'/api/log',
      method: 'post',
      data: data
    });
  };
  
  return factory;
};

logFactory.$inject = ['$http'];

angular.module('mainApp').factory('logFactory', logFactory);