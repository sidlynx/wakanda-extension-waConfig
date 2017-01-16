'use strict';

window.$ = window.jQuery = require('jquery');
var angular = require("angular");
var ngRoute = require("angular-route");

require("font-awesome-webpack");

require("../../node_modules/tether/dist/css/tether.css");
window.Tether = require("../../node_modules/tether/dist/js/tether");
require("../../node_modules/bootstrap/dist/css/bootstrap.css");
require("../../node_modules/bootstrap/dist/js/bootstrap");

require("angular-ui-bootstrap");


require("../www/css/app.scss");


var app = angular
    .module("waConfig", ["ngRoute", "ui.bootstrap"])

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
    });




studio.inited().then(function () {

})




module.exports = app;

require("./factories");
require("./controllers");
require("./directives");
