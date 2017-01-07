app.controller('editProfileController',function(AuthService,$scope,$location,$rootScope,$http,$log,ModalService){


$scope.user={};
$scope.user.country=[];

$scope.profileurl="";
$scope.drzave={};
$scope.nativeNames=[];
$scope.names=[];
$scope.drzavegradovi=[];
$scope.gradovi=[];


$log.log($scope.user.country);
$log.log($scope.user.city);
$http.get("https://restcountries.eu/rest/v1/all").then(function(response){
	$scope.drzave=response.data;
	
	for (i in $scope.drzave){
		$scope.nativeNames.push($scope.drzave[i]["nativeName"]);
		$scope.names.push($scope.drzave[i]["name"]);
	}
})

$http.get("https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json").then(function(response){
	$scope.drzavegradovi=response.data;
	
	$log.log($scope.gradovi);
})

$scope.vratiGradove=function(){
	$scope.gradovi=$scope.drzavegradovi[$scope.user.country];
}




  if($rootScope.token!==null){
    $scope.userName=$rootScope.userName;
    $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
      $scope.user=response.data;
      $scope.profileurl="";
      $scope.profileurl="http://localhost:8080/download?name="+$scope.userName+"&rand="+Math.random();
      $scope.mjeseci=['Mjesec','Jan','Feb','Mart','April','Maj','Juni','Juli','Aug','Sept','Okt','Nov','Dec'];
      $scope.dani=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
      $scope.godine=[];
      $scope.status=['Slobodna/Slobodan','U vezi','Zarucena/Zarucen','U braku','Razvedena/Razveden','Udovica/Udovac','Komplikovan'];
      $scope.spol=['Zenski','Muski','Drugo'];
      $scope.zainteresovanost=['Zene','Muskarci','Oboje'];

      for(i=1905;i<2017;i++){
      	$scope.godine.push(i);
      }
     $log.log($scope.user);
    })

  }


  $scope.sacuvaj=function(){
$http.put("http://localhost:8080/users/"+$scope.user.id,$scope.user).then(function(response){
  $location.path("/profile");
})
  }


    $scope.odustani=function(){
    $scope.vratiGradove();
    $location.path("/profile");
  }

  $scope.vratiGradove();
})