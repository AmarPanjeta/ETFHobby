app.controller('hobbiesController',function($scope,$http,$log,$rootScope,$location,ModalService){
  $scope.hobbies=[];
  var user={};
  var modalOptions = {
           closeButtonText: 'Odustani',
           actionButtonText: 'Ukloni hobi',
           headerText: 'Brisanje hobija',
           bodyText: 'Da li ste sigurni da zelite ukloniti odabrani hobi?'
  };

  $log.log("kontroler ucitan!");


  $http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.userName).then(function(response){
    user=response.data;
    $http.get("http://localhost:8080/hobbies/search/gethobbiesbyuser?id="+user.id).then(function(response){
      $scope.hobbies=response.data._embedded.hobbies;
      $log.log($scope.hobbies);
    })
  })

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
})
