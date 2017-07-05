var app = angular.module("my-app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "resources/home.html",
            controller : "myCtrl",
            data: {
                pageTitle: "home"
            }
        })
        .when("/objects", {
            templateUrl : "resources/detected_objects.html",
            controller : "objects",
            data: {
                pageTitle: "objects"
            }
        })
        .when("/cameras", {
            templateUrl : "resources/cameras.html",
            controller : "cameras",
            data: {
                pageTitle: "cameras"
            }
        })
        .when("/login", {
            templateUrl : "resources/login.html",
            controller : "login",
            data: {
                pageTitle: "login"
            }
        });
});


app.controller('head',function ($scope) {
    $scope.showMe = false;
    $scope.myFoo = function() {
        $scope.showMe = !$scope.showMe;
    }
});