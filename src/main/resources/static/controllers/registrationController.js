app.controller('registrationController',function($http,$scope,$location){
 $scope.user={}
 $scope.passwordRepeat=""
 $scope.user.password=""
 //izmjena
 $scope.register=function(){	
 	console.log(!$scope.user.password==$scope.passwordRepeat);
 	if ($scope.passwordRepeat==$scope.user.password){
 		$http.post("http://localhost:8080/user/registration",$scope.user).then(function(response){
 			$location.path("/")
 		})
 	}
 }
})


