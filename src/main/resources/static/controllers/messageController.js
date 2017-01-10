app.controller('messageController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService,$q,$routeParams){
	$scope.messages={};
	$scope.user={};
	$scope.message={};
	$scope.prijatelj={};
	$scope.page=0;
    $scope.numberOfMessages=0;
    $scope.size=6;





    $log.log("usli poruke");

	  if($rootScope.token!==null){
	    $scope.userName=$rootScope.userName;
	    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
	       $scope.user=response.data;
	       $log.log($scope.user);
	       $log.log($scope.user.id);

	$http.get("http://localhost:8080/messages/search/countmessages?user1="+$scope.user.id+"&user2="+$routeParams.id).then(function(response){
		$scope.numberOfMessages=response.data;



		if($scope.numberOfMessages%$scope.size==0){
	   $scope.page=$scope.numberOfMessages/$scope.size-1;
	}else{
		$scope.page=Math.floor($scope.numberOfMessages/$scope.size);
	}

	$log.log("usli u slot"+$scope.page);

	$http.get("http://localhost:8080/messages/search/getmessagesbyusers?user1="+$scope.user.id+"&user2="+$routeParams.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
		$scope.messages=response.data._embedded.messages;



    $http.get("http://localhost:8080/users/search/getUserById?id="+$routeParams.id).then(function(response){
    	$scope.prijatelj=response.data;
    })
	
	
	})


    })

	})
	$log.log("broj por:"+$scope.numberOfMessages);


	
	
  }

$scope.posaljiPoruku=function(){

od="";
za="";
  $scope.message.user1=$scope.user._links.self.href;
  
 od=$scope.userName;
  za=$scope.prijatelj.username;
  
  $http.get("http://localhost:8080/users/search/getUserById?id="+$routeParams.id).then(function(response){
     $scope.message.user2=response.data._links.self.href;
    
     $scope.message.status=od+" "+za;
$log.log($scope.message);

    $http.post("http://localhost:8080/messages",$scope.message).then(function(response){
  $log.log("poslna poruka");
  $scope.message={};

	$http.get("http://localhost:8080/messages/search/countmessages?user1="+$scope.user.id+"&user2="+$routeParams.id).then(function(response){
		$scope.numberOfMessages=response.data;

		  	if($scope.numberOfMessages%$scope.size==0){
	   $scope.page=$scope.numberOfMessages/$scope.size-1;
	}else{
		$scope.page=Math.floor($scope.numberOfMessages/$scope.size);
	}

	

  	$http.get("http://localhost:8080/messages/search/getmessagesbyusers?user1="+$scope.user.id+"&user2="+$routeParams.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
		$scope.messages=response.data._embedded.messages;



	})
    

	})


  
})

  })
  
}



$scope.naprijed=function(){


$scope.page=$scope.page+1;

$log.log("number"+$scope.numberOfMessages);
if($scope.numberOfMessages%$scope.size==0){
  if($scope.page>=$scope.numberOfMessages/$scope.size){
    $scope.page=$scope.numberOfMessages/$scope.size-1;
    $log.log("uslo"+$scope.page);
  }
}else{
  if($scope.page>=$scope.numberOfMessages/$scope.size){
    $scope.page=Math.floor($scope.numberOfMessages/$scope.size);
  }
}

         	$http.get("http://localhost:8080/messages/search/getmessagesbyusers?user1="+$scope.user.id+"&user2="+$routeParams.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
		$scope.messages=response.data._embedded.messages;
			$http.get("http://localhost:8080/messages/search/countmessages?user1="+$scope.user.id+"&user2="+$routeParams.id).then(function(response){
		$scope.numberOfMessages=response.data;
	})


	})
         
}

$scope.nazad=function(){

$scope.page=$scope.page-1;
if($scope.page<0){
  $scope.page=0;
}

  	$http.get("http://localhost:8080/messages/search/getmessagesbyusers?user1="+$scope.user.id+"&user2="+$routeParams.id+"&page="+$scope.page+"&size="+$scope.size).then(function(response){
		$scope.messages=response.data._embedded.messages;
			$http.get("http://localhost:8080/messages/search/countmessages?user1="+$scope.user.id+"&user2="+$routeParams.id).then(function(response){
		$scope.numberOfMessages=response.data;
	})


	})
         
}



})