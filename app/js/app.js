var app = angular.module("waConfig", ["ngRoute"]);


app.config(['$routeProvider',  function ($routeProvider) {    
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexCtrl'
        })
        .when('/:section', {
            templateUrl: 'views/section.html',
            controller: 'SectionCtrl'
        })
        .otherwise({
            templateUrl: '404.html',
            controller: 'IndexCtrl'
        });
        
}]);

app.run(function ($rootScope, $location, $window) {
        $rootScope.navigator = {};
        $rootScope.navigator.goTo = function (url) {
            $location.path(url);
        };
        $rootScope.navigator.goToExternal = function (url, _blank) {
            if (_blank)
                $window.open(url, '_blank');
            else $window.open(url, '_self');
        };
    });



app.controller("IndexCtrl", function ($scope,$rootScope) {
    $scope.section = {};
    $scope.section.navigate = function(section){
        $rootScope.navigator.goTo("/" + section);
    }
    })

app.controller("SectionCtrl", function ($scope) {

    })