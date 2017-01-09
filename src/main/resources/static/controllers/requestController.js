app.controller('requestController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService){
	$scope.user={};
	$scope.unfriends=[];
	$scope.profileurls=[];
  

    


	  if($rootScope.token!==null){
	    $scope.userName=$rootScope.userName;
	    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
	       $scope.user=response.data;
	     

	       $http.get("http://localhost:8080/relations/search/getfriendrequests?id="+$scope.user.id).then(function(response){
	       	$scope.unfriends=response.data._embedded.users;
          
          $rootScope.numberOfRequests=$scope.unfriends.length;

            for (i=0;i<$scope.unfriends.length;i++){
            	 $log.log($scope.unfriends[i].username);
			     profileurl="http://localhost:8080/download?name="+$scope.unfriends[i].username;
			     
			     $scope.profileurls.push(profileurl);
                 }
	  
	       })
    })
	  
  }

$scope.approveRequest=function(id,idx){
  relation={};
  relation.user1=$scope.user._links.self.href;
  id1=$scope.user.id;
  $log.log(relation.user1);
   
  $http.get("http://localhost:8080/users/search/getUserById?id="+id).then(function(response){
    relation.user2=response.data._links.self.href;
    relation.type="friends";

    $http.get("http://localhost:8080/relations/search/getrelationidbyusers?user1="+id1+"&user2="+id).then(function(response){
    	k=response.data;
        $log.log(response.data);
         $http.put("http://localhost:8080/relations/"+k,relation);
          
            $log.log("izbaci");
          $scope.unfriends.splice(idx,1);

        
         

    	
    })




  })


}

$scope.deleteRequest=function(id,idx){

  id1=$scope.user.id;

  $http.get("http://localhost:8080/relations/search/deleterelation?user1="+$scope.user.id+"&user2="+id).then(function(response){
    if(response.data>0){
          $log.log("Uspjesno brisanje!");
          $scope.unfriends.splice(idx,1);
        }
  })

}




})