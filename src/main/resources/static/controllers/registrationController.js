app.controller('registrationController',function($http,$scope,$location,ModalService){
 $scope.user={}
 $scope.passwordRepeat=""
 $scope.user.password=""
 //izmjena
 var modalOptions = {
          closeButtonText: 'Odustani',
          actionButtonText: 'Ok',
          headerText: 'Neuspjela registracija',
          bodyText: 'Korisnicko ime vec postoji!'
 };

 $scope.register=function(){
 	console.log(!$scope.user.password==$scope.passwordRepeat);
 	if ($scope.passwordRepeat==$scope.user.password){
 		$http.post("http://localhost:8080/user/registration",$scope.user).then(function(response){
 			$location.path("/")
 		},function(error){
      ModalService.showModal({},modalOptions);
    })
 	}
 }
})
