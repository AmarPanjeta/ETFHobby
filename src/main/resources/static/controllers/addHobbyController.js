app.controller('addHobbyController',function($scope,$http,$log,$rootScope,$location,ModalService){
  $scope.hobbies={};
  $scope.user={};
  $scope.myhobbies={};
  $scope.diff={};
  

  $http.get("http://localhost:8080/hobbies").then(function(response){
    $scope.hobbies=response.data._embedded.hobbies;
  })

  $http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.userName).then(function(response){
    $scope.user=response.data;
    $log.log($scope.user.id);

      $http.get("http://localhost:8080/hobbies/search/gethobbiesbyuser?id="+$scope.user.id).then(function(response){  
        $scope.myhobbies=response.data._embedded.hobbies;
        
         
  
        
      })




$http.get("http://localhost:8080/hobbies/search/gethobbiescomplement?id="+$scope.user.id).then(function(response){  
        $scope.diff=response.data._embedded.hobbies;             
      }) 

  });





  $scope.dropCallback = function(event, index, item, external, type, allowedType) {

      userHobby={};
      userHobby.hobby=item._links.self.href;
      userHobby.user=$scope.user._links.self.href;

        $http.post("http://localhost:8080/userhobbies",userHobby).then(function(){
          
          
        });
        return item;
    };

  $scope.dropCallbackOne = function(event, index, item, external, type, allowedType) {

      $http.get("http://localhost:8080/userhobbies/search/deleteuserhobby?user="+$scope.user.id+"&hobby="+item.id).then(function(response){
      
        //$scope.hobbies.splice(idx,1);
      })
      
      return item;
    };

 //$scope.diff=_.difference($scope.hobbies, $scope.myhobbies);

  $log.log($scope.selectedHobby);
  $scope.add=function() {
    $log.log($scope.selectedHobby);
    $log.log($scope.user);
    if($scope.selectedHobby!==undefined){
      userHobby={};
      userHobby.hobby=$scope.selectedHobby._links.self.href;
      userHobby.user=$scope.user._links.self.href;
      $http.post("http://localhost:8080/userhobbies",userHobby).then(function() {
        $location.path("/hobbies");
      })
    }
  }

$scope.izmjenaListeHobija=function(){
  $location.path("/profile");
}

      

 $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

})
