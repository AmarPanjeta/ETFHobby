app.controller('navigationController',function($rootScope,$location,$scope,$http,$route){

  $rootScope.greeting = '';
  $rootScope.token = null;
  $rootScope.error = null;
  $rootScope.roleUser = false;
  $rootScope.roleAdmin = false;
  $rootScope.roleFoo = false;

  if(localStorage.hasOwnProperty("token")){
    $rootScope.token=localStorage.getItem("token");
    $rootScope.userName=localStorage.getItem("userName");

  }

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
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    $http.defaults.headers.common.Authorization = '';
    $location.path("/");
  };

  $scope.profile=function(){
    $location.path("/");
  }

});
