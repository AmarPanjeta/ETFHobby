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
    controller: "hobbiesController"
     /* resolve: {
       factory: checkRouting
                }
                */

  }).otherwise("/")
});

/*
var checkRouting= function (TokenService,$q, $rootScope, $location,$http) {
   if ($rootScope.token !== null) {
        return true;
    } else {
        var deferred = $q.defer();
        TokenService.tokenExists() //obrisano
            .success(function (response) {
                deferred.resolve(true);
            })
            .error(function () {
                deferred.reject();
                $location.path("/");
             });
        return deferred.promise;
    }

};
*/
