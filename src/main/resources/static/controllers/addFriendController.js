app.controller('addFriendController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService,$q){
	$scope.user={};
	$scope.unfriends=[];
	$scope.noRelations=[];
    $scope.page=0;
    $scope.numberOfFriends=0;
    $scope.size=6;  
    $scope.zeroRequests=[false,false,false,false,false,false];


	  if($rootScope.token!==null){
	    $scope.userName=$rootScope.userName;
	    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
	       $scope.user=response.data;
	        id1=$scope.user.id;

	        $http.get("http://localhost:8080/relations/search/getnumberoffriendscomplement?id="+$scope.user.id).then(function(response){
	        	$scope.numberOfFriends=response.data;
	        })

	       $http.get("http://localhost:8080/relations/search/getfriendscomplement?id="+$scope.user.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
	       $scope.unfriends=response.data._embedded.users;
	       
	       $log.log($scope.unfriends);
	       for(i=0;i<$scope.unfriends.length;i++){
	            
				$scope.inRelation(id1,$scope.unfriends[i].id);

			    
	       }

           $log.log($scope.zeroRequests);
	  
	       })
    })
	  
  }


   $scope.inRelation=function(id1,id2){

  	$http.get("http://localhost:8080/relations/search/relationexist?user1="+id1+"&user2="+id2).then(function(response){
					$log.log("Odgovor: "+response.data);
                    ima=response.data;

                    if(ima==0) {
                    	for(j=0;j<$scope.unfriends.length;j++){
                    		if($scope.unfriends[j].id==id2){
                    			$scope.zeroRequests[j]=true;
                    		}
                    	}
						

						$log.log("promijenjeno je");
						$log.log($scope.zeroRequests);
						$log.log(i);
						
						
					}
				
				})
  }

$scope.sendFriendRequest=function(id,idx){
  relation={};
  relation.user1=$scope.user._links.self.href;
  
  $http.get("http://localhost:8080/users/search/getUserById?id="+id).then(function(response){
    relation.user2=response.data._links.self.href;
    relation.type="Poslan zahtjev";


    $http.post("http://localhost:8080/relations",relation).then(function(response){
  $log.log("poslan zahtjev");
  $scope.zeroRequests[idx]=false;
})

  })


}

$scope.nemaZahtjeva=function(id){
	var deferred = $q.defer();
	id1=$scope.user.id;
	$http.get("http://localhost:8080/relations/search/relationexist?user1="+id1+"&user2="+id).then(function(kifla){
		deferred.resolve(response.data);
	})    
	  
  
  return deferred.promise==0;
}

$scope.deleteRequest=function(id,idx){

  id1=$scope.user.id;

  $http.get("http://localhost:8080/relations/search/deleterelation?user1="+$scope.user.id+"&user2="+id).then(function(response){
    if(response.data>0){
          $log.log("Uspjesno brisanje!");
           $scope.zeroRequests[idx]=true;
          
        }
  })

}


$scope.proba=function(id){
	$log.log("logaj");
	return true;
}

$scope.naprijed=function(){


$scope.page=$scope.page+1;

$log.log("number"+$scope.numberOfFriends);
if($scope.numberOfFriends%$scope.size==0){
  if($scope.page>=$scope.numberOfFriends/$scope.size){
    $scope.page=$scope.numberOfFriends/$scope.size-1;
    $log.log("uslo"+$scope.page);
  }
}else{
  if($scope.page>=$scope.numberOfFriends/$scope.size){
    $scope.page=Math.floor($scope.numberOfFriends/$scope.size);
  }
}

         $http.get("http://localhost:8080/relations/search/getfriendscomplement?id="+$scope.user.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
          $scope.unfriends=response.data._embedded.users;

  
          
         })
         $log.log($scope.page);
         
}

$scope.nazad=function(){

$scope.page=$scope.page-1;
if($scope.page<0){
  $scope.page=0;
}

         $http.get("http://localhost:8080/relations/search/getfriendscomplement?id="+$scope.user.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
          $scope.unfriends=response.data._embedded.users;
       

         
         })
         
}



})