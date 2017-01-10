function fileCtrl ($scope,$rootScope,$location) {
    $scope.partialDownloadLink = 'http://localhost:8080/download?filename=';
    $scope.filename = '';

    $scope.username=$rootScope.userName;
    $scope.uploadFile = function() {
        $scope.processDropzone();
        $location.path("/profile");

    };

    $scope.reset = function() {
        $scope.resetDropzone();
    };
}

app.controller('fileCtrl', fileCtrl);
