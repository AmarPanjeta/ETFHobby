app.controller('addFriendController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService){
	$scope.user={};
	$scope.unfriends=[];
	$scope.profileurls=[];

    


	  if($rootScope.token!==null){
	    $scope.userName=$rootScope.userName;
	    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
	       $scope.user=response.data;
	     

	       $http.get("http://localhost:8080/relations/search/getfriendscomplement?id="+$scope.user.id).then(function(response){
	       	$scope.unfriends=response.data._embedded.users;


            for (i=0;i<$scope.unfriends.length;i++){
            	 $log.log($scope.unfriends[i].username);
			     profileurl="http://localhost:8080/download?name="+$scope.unfriends[i].username;
			     
			     $scope.profileurls.push(profileurl);
                 }
	  
	       })
    })
	  
  }

$scope.sendFriendRequest=function(id){
  relation={};
  relation.user1=$scope.user._links.self.href;
  
  $http.get("http://localhost:8080/users/search/getUserById?id="+id).then(function(response){
    relation.user2=response.data._links.self.href;
    relation.type="Poslan zahtjev";

    $http.post("http://localhost:8080/relations",relation).then(function(response){
  $log.log("poslan zahtjev");
})

  })


}

$scope.nemaZahtjeva=function(id){
	id1=$scope.user.id;
	$http.get("http://localhost:8080/relations/search/relationexist?user1="+id1+"&user2="+id).then(function(response){
		return response.data==0;
	})
}



})