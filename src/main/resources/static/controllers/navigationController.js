app.controller('navigationController',function($rootScope,$location,$scope,$http,$route,$interval){

  $rootScope.greeting = '';
  $rootScope.token = null;
  $rootScope.error = null;
  $rootScope.roleUser = false;
  $rootScope.roleAdmin = false;
  $rootScope.roleFoo = false;
  $rootScope.test="";
  $rootScope.numberOfRequests=0;

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

  $scope.filter=function(){
  $rootScope.test=$scope.test;
}

  $scope.profile=function(){
    $location.path("/");
  }


$scope.ucitajZahtjeve=function(){
    if($rootScope.token!==null){
      $scope.userName=$rootScope.userName;
      $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
         $scope.user=response.data;
       

         $http.get("http://localhost:8080/relations/search/getnumberofrequests?id="+$scope.user.id).then(function(response){
         
          
          $rootScope.numberOfRequests=response.data;

     
    
         })
    })
    
  }
}

  $interval($scope.ucitajZahtjeve,1000);
$scope.imaZahtjeva=function(){
return $rootScope.numberOfRequests!=0;
}

});
