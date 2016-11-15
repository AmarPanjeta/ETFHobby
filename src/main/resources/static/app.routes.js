app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl:"partials/homePage.html",
    controller:'homeController'
  }).when('/login',{
    templateUrl:"partials/loginPage.html",
    controller:"loginController"
  }).when('/registration',{
    templateUrl:"partials/registrationPage.html",
    controller:"registrationController"
  }).when("/hobbies/add",{
    templateUrl:"partials/addHobbyPage.html",
    controller: "addHobbyController"
  }).when("/hobbies",{
    templateUrl: "partials/hobbiesPage.html",
    controller: "hobbiesController",
     resolve: {
       factory: checkRouting
                }



  }).when("/upload",{
    templateUrl:"partials/imageUpload.html",
    controller:"fileCtrl"
  }).otherwise("/")
});


var checkRouting= function ($q, $rootScope, $location,$http) {

        var deferred = $q.defer();
        if($rootScope.token !== null)
        {
                deferred.resolve(true);
        }
        else {
                deferred.reject();
                $location.path("/login");
             }
        return deferred.promise;



};
