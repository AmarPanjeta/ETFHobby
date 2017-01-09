app.controller('relationController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService){
	$scope.user={};
	$scope.friends=[];
	$scope.profileurls=[];
  $scope.page=0;
  $scope.numberOfFriends=0;
    


	  if($rootScope.token!==null){
	    $scope.userName=$rootScope.userName;
	    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
	       $scope.user=response.data;
	       $log.log($scope.user);
	       $log.log($scope.user.id);

	       $http.get("http://localhost:8080/relations/search/getfriendsbyuserid?id="+$scope.user.id+"&page="+$scope.page+"&size=4").then(function(response){
	       	$scope.friends=response.data._embedded.users;


            for (i=0;i<$scope.friends.length;i++){
            	 $log.log($scope.friends[i].username);
			     profileurl="http://localhost:8080/download?name="+$scope.friends[i].username;
			     $log.log($scope.profileurl);
			     $scope.profileurls.push(profileurl);
                 }
	       	$http.get("http://localhost:8080/relations/search/countfriends?id="+$scope.user.id).then(function(response){
            $scope.numberOfFriends=response.data;
          })

	       })
    })
	    $log.log("filteer");
    $log.log($rootScope.test);
  }


  $scope.removeFriend=function(oid,idx){
  	ModalService.showModal({},modalOptions).then(function(){
  	$http.get("http://localhost:8080/relations/search/deleterelation?user1="+$scope.user.id+"&user2="+oid).then(function(response){
  		if(response.data>0){
          $log.log("Uspjesno brisanje!");
          $scope.friends.splice(idx,1);
        }
  	})
  	})
  }


  $scope.showFriend=function(id){
     $rootScope.friendToShowId=id;
     $log.log("dosli");
     $log.log($rootScope.friendToShowId);
  	 $location.path("/friend");
  }

$scope.naprijed=function(){
$scope.page=$scope.page+1;
$log.log($scope.page);

if($scope.numberOfFriends%4==0){
  if($scope.page>=$scope.numberOfFriends/4){
    $scope.page=$scope.numberOfFriends/4-1;
  }
}else{
  if($scope.page>=$scope.numberOfFriends/4){
    $scope.page=Math.floor($scope.numberOfFriends/4);
  }
}

         $http.get("http://localhost:8080/relations/search/getfriendsbyuserid?id="+$scope.user.id+"&page="+$scope.page+"&size=4").then(function(response){
          $scope.friends=response.data._embedded.users;


            for (i=0;i<$scope.friends.length;i++){
               $log.log($scope.friends[i].username);
           profileurl="http://localhost:8080/download?name="+$scope.friends[i].username;
           $log.log($scope.profileurl);
           $scope.profileurls.push(profileurl);
                 }
          
         })
         $log.log($scope.page);
}

$scope.nazad=function(){

$scope.page=$scope.page-1;
if($scope.page<0){
  $scope.page=0;
}

         $http.get("http://localhost:8080/relations/search/getfriendsbyuserid?id="+$scope.user.id+"&page="+$scope.page+"&size=4").then(function(response){
          $scope.friends=response.data._embedded.users;


            for (i=0;i<$scope.friends.length;i++){
               $log.log($scope.friends[i].username);
           profileurl="http://localhost:8080/download?name="+$scope.friends[i].username;
           $log.log($scope.profileurl);
           $scope.profileurls.push(profileurl);
                 }
         
         })
         $log.log($scope.page);
}

   var modalOptions = {
           closeButtonText: 'Odustani',
           actionButtonText: 'Ukloni prijatelja',
           headerText: 'Brisanje prijatelja',
           bodyText: 'Da li ste sigurni da zelite ukloniti odabranog prijatelja?'
  };

})