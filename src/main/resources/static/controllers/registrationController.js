app.controller('registrationController',function($http,$scope,$location){
 $scope.user={}
 $scope.register=function(){	
 	if ($scope.passwordRepeat==$scope.user.password){
 		$http.post("http://localhost:8080/user/registration",$scope.user).then(function(response){
 			$location.path("/")
 		})
 	}
 }
})
