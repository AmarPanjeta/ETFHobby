app.controller('hobbiesController',function($scope,$http,$log,$rootScope,$location){
  $scope.hobbies=[];

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
})
