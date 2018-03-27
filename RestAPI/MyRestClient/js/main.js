var purchaseApp = angular.module("myApp", []);

purchaseApp.controller("myAppController", function($http, $scope) {

    $http({method: 'GET', url: 'http://localhost:3000/news'}).
    then(function success(response) {
        $scope.resultData = response.data;
    });

});
