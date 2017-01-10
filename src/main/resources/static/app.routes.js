app.config(function($routeProvider){
  $routeProvider.when('/profile',{
     templateUrl:"partials/profilePage.html",
     controller:'profileController',
     resolve:{
      factory: checkRouting
     }
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
  }).when("/",{
    templateUrl:"partials/homePage1.html"
  }).when("/profile/edit",{
    templateUrl:"partials/editProfileInfo.html",
    controller: "editProfileController",
    resolve:{
      factory: checkRouting
    }
  }).when("/relations",{
    templateUrl: "partials/friendsPage.html",
    controller: "relationController",
     resolve: {
       factory: checkRouting
                }
  }).when("/friend",{
    templateUrl:"partials/friendProfilePage.html",
    controller: "showFriendController",
    resolve:{
      factory: checkRouting
    }
  }).when("/unfriend",{
    templateUrl:"partials/unfriendsPage.html",
    controller:"addFriendController",
    resolve:{
      factory: checkRouting
    }
  }).when("/request",{
    templateUrl:"partials/requestsPage.html",
    controller: "requestController",
    resolve:{
      factory: checkRouting
    }
  }).when("/messages/:username",{
    templateUrl: "partials/MessagePage.html",
    controller:"messageController",
    resolve:{
      factory:checkRouting
    }
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
