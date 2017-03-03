'use strict';

window.$ = window.jQuery = require('jquery');
var angular = require("angular");
var ngRoute = require("angular-route");

require("font-awesome-webpack");

require("../../node_modules/tether/dist/css/tether.css");
window.Tether = require("../../node_modules/tether/dist/js/tether");
require("../../node_modules/bootstrap/dist/css/bootstrap.css");
require("../../node_modules/bootstrap/dist/js/bootstrap");

require("../../node_modules/angular-flash-alert/dist/angular-flash.css");
require("../../node_modules/angular-flash-alert/dist/angular-flash.js");

require("angular-ui-bootstrap");


require("../www/css/app.scss");


var app = angular
    .module("waConfig", ["ngRoute", "ui.bootstrap", "ngFlash"])

    .config(['$routeProvider', function ($routeProvider) {
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

        $rootScope.file = {};
        $rootScope.file.openFileInEditor = function (path) {
            studio.currentSolution.getProjects().then((projectList) => {
                var folderPath = studio.solutionFolderPath;
                folderPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
                folderPath += "/";

                try {
                    folderPath += JSON.parse(projectList)[0] + "/";
                }
                catch (e) {

                }
                studio.openFile(folderPath + path);
            })
        }
    });




studio.inited().then(function () {
    angular.bootstrap("html", ["waConfig"]);
})




module.exports = app;

require("./factories");
require("./controllers");
require("./directives");
