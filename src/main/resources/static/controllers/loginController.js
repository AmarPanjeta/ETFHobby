app.controller('loginController', ['AuthService','$scope','$http','$log','$rootScope','$location',
        function(AuthService, $scope, $http,$log,$rootScope,$location) {
            $scope.greeting = '';
            $scope.token = $rootScope.token;
            $scope.error = null;
            $scope.roleUser = false;
            $scope.roleAdmin = false;
            $scope.roleFoo = false;
            $log.log("tu sam")
            $scope.login = function() {
                $scope.error = null;
                AuthService.login($scope.userName,$scope.password).then(function(token) {
                    $rootScope.token = token;
                    localStorage.setItem("token",token);
                    $rootScope.userName=$scope.userName;
                    localStorage.setItem("userName",$scope.userName);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                   // $scope.checkRoles();
                    $location.path('/');
                },
                function(error){
                    $scope.error = error
                    $scope.userName = '';
                });
            }

            $scope.checkRoles = function() {
                AuthService.hasRole('user').then(function(user) {$scope.roleUser = user});
                AuthService.hasRole('admin').then(function(admin) {$scope.roleAdmin = admin});
                AuthService.hasRole('foo').then(function(foo) {$scope.roleFoo = foo});
            }

            $scope.logout = function() {
                $scope.userName = '';
                $scope.token = null;
                $rootScope.token=null;
                localStorage.removeItem("token");
                localStorage.removeItem("userName");
                $http.defaults.headers.common.Authorization = '';
            }

            $scope.loggedIn = function() {
                return $rootScope.token !== null;
            }
        } ]);
