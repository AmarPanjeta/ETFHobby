app.controller('profileController',function(AuthService,$scope,$location,$rootScope,$http){



  $scope.checkRoles = function() {
      AuthService.hasRole('user').then(function(user) {$scope.roleUser = user});
      AuthService.hasRole('admin').then(function(admin) {$scope.roleAdmin = admin});
      AuthService.hasRole('foo').then(function(foo) {$scope.roleFoo = foo});
  }
  

  $scope.loggedIn = function() {
      return $rootScope.token !== null;
  }
  $scope.user={}
  $scope.profileurl="";
  if($rootScope.token!==null){
   // $scope.checkRoles();
    $scope.userName=$rootScope.userName;
    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
      $scope.user=response.data;
      $scope.profileurl="";
      $scope.profileurl="http://localhost:8080/download?name="+$scope.userName+"&rand="+Math.random();
    })

  }

  $scope.upload=function(){
     $location.path("/upload");
  }

})
