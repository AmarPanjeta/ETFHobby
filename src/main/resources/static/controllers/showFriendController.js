app.controller('showFriendController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService){
	$scope.friendToShow={};
	$scope.friendToShowImage="";
	$scope.friendshobbies={};





$scope.vratiPodatke=function(){


$http.get("http://localhost:8080/users/search/getUserById?id="+$rootScope.friendToShowId).then(function(response){
$scope.friendToShow=response.data;

$http.get("http://localhost:8080/hobbies/search/gethobbiesbyuser?id="+$scope.friendToShow.id).then(function(response){  
    $scope.friendshobbies=response.data._embedded.hobbies;
        
 })

$scope.friendToShowImage="http://localhost:8080/download?name="+$scope.friendToShow.username;

})





}



if($rootScope.friendToShowId!=null && $rootScope.friendToShowId!="") {
	$scope.vratiPodatke();
}


//$rootScope.friendToShowId="";
})