app.controller('addHobbyController',function($scope,$http,$log,$rootScope){
  $scope.hobbies={}
  $scope.user={};

  $http.get("http://localhost:8080/hobbies").then(function(response){
    $scope.hobbies=response.data._embedded.hobbies;
  })

  $http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.userName).then(function(response){
    $scope.user=response.data;});

  $log.log($scope.selectedHobby);
  $scope.add=function() {
    $log.log($scope.selectedHobby);
    $log.log($scope.user);
    if($scope.selectedHobby!==undefined){
      userHobby={};
      userHobby.hobby=$scope.selectedHobby._links.self.href;
      userHobby.user=$scope.user._links.self.href;
      $http.post("http://localhost:8080/userhobbies",userHobby).then(function() {
        alert("yaaaaaaay");
      })
    }
  }
})
