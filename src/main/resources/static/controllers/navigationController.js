app.controller('navigationController',function($rootScope,$scope,$http,$route){

  $rootScope.greeting = '';
  $rootScope.token = null;
  $rootScope.error = null;
  $rootScope.roleUser = false;
  $rootScope.roleAdmin = false;
  $rootScope.roleFoo = false;

  var self = this;

	self.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

  $rootScope.logged=function(){
    return $rootScope.token!==null;
  };

  $scope.logout=function(){
    $rootScope.userName='';
    $rootScope.token=null;
    $http.defaults.headers.common.Authorization = '';
  };

});
