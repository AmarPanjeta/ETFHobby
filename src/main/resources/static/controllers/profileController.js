app.controller('profileController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService){



  $scope.checkRoles = function() {
      AuthService.hasRole('user').then(function(user) {$scope.roleUser = user});
      AuthService.hasRole('admin').then(function(admin) {$scope.roleAdmin = admin});
      AuthService.hasRole('foo').then(function(foo) {$scope.roleFoo = foo});
  }


  $scope.loggedIn = function() {
      return $rootScope.token !== null;
  }

  $scope.user={}
  $scope.hobbies=[];

  $scope.profileurl="";
  if($rootScope.token!==null){
   // $scope.checkRoles();
    $scope.userName=$rootScope.userName;
    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
      $scope.user=response.data;
      $scope.profileurl="";
      $scope.profileurl="http://localhost:8080/download?name="+$scope.userName+"&rand="+Math.random();
    })
    $http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.userName).then(function(response){
      user=response.data;
      $http.get("http://localhost:8080/hobbies/search/gethobbiesbyuser?id="+user.id).then(function(response){
        $scope.hobbies=response.data._embedded.hobbies;
        $log.log($scope.hobbies);
      })
    })
  }


  $scope.upload=function(){
     $location.path("/upload");
  }

  $scope.addHobby=function(){
    $location.path("/hobbies/add");
  }

  $scope.removeHobby=function(oid,idx){
    ModalService.showModal({},modalOptions).then(function(){
      $http.get("http://localhost:8080/userhobbies/search/deleteuserhobby?user="+user.id+"&hobby="+oid).then(function(response){
        if(response.data>0){
          $log.log("Uspjesno brisanje!");
          $scope.hobbies.splice(idx,1);
        }
        //$scope.hobbies.splice(idx,1);
      })

    })
  }

  var modalOptions = {
           closeButtonText: 'Odustani',
           actionButtonText: 'Ukloni hobi',
           headerText: 'Brisanje hobija',
           bodyText: 'Da li ste sigurni da zelite ukloniti odabrani hobi?'
  };

})
