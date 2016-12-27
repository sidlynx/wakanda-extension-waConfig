'use strict';

window.$ = window.jQuery = require('jquery');
var angular = require("angular");
var ngRoute = require("angular-route");



require("../../node_modules/tether/dist/css/tether.css");
window.Tether = require("../../node_modules/tether/dist/js/tether");
require("../../node_modules/bootstrap/dist/css/bootstrap.css");
require("../../node_modules/bootstrap/dist/js/bootstrap");


require("../www/css/app.scss");


module.exports = angular
    .module("waConfig", ["ngRoute"])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'www/views/index.html',
                controller: 'IndexCtrl'
            })
            .when('/:section', {
                templateUrl: 'www/views/section.html',
                controller: 'SectionCtrl'
            })
            .otherwise({
                templateUrl: 'www/404.html',
                controller: 'IndexCtrl'
            });

    }])

    .run(function ($rootScope, $location, $window) {
        $rootScope.navigator = {};
        $rootScope.navigator.goTo = function (url) {
            $location.path(url);
        };
        $rootScope.navigator.goToExternal = function (url, _blank) {
            if (_blank)
                $window.open(url, '_blank');
            else $window.open(url, '_self');
        };
    })

    .controller("IndexCtrl", function ($scope, $rootScope) {
        $scope.section = {};
        $scope.section.navigate = function (section) {
            $rootScope.navigator.goTo("/" + section);
        }
    })

    .controller("SectionCtrl", function ($scope) {

    })






