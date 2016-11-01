app.service('AuthService', function($http,$rootScope) {
    return {
        login : function(username,password) {
            return $http.post('/user/login', {username: username,password: password}).then(function(response) {
                return response.data.token;
            });
        },

        hasRole : function(role) {
            return $http.get('/api/role/' + role).then(function(response){
                console.log(response);
                return response.data;
            });
        }
    };
});
