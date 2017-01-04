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


module.exports = angular
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
    })

    .controller("IndexCtrl", function ($scope, $rootScope) {
        $scope.section = {};
        $scope.section.navigate = function (section) {
            $rootScope.navigator.goTo("/" + section);
        }
    })

    .controller("SectionCtrl", function ($scope) {
        $scope.section = {};
        $scope.section.items = [{
            "name": "Cache",
            "type": "object",
            "properties": [{
                "type": "anyOf",
                "properties": [{
                    "name": "local",
                    "type": "object",
                    "formLabel": "Local"
                }, {
                    "name": "Redis",
                    "type": "object",
                    "properties": [{
                        "name": "ipAddress",
                        "type": "ip",
                        "formLabel": "Redis Ip address",
                        "formTip": "Lorem ipsum dolor sit amet consectetur adipiscing elit."
                    }, {
                        "name": "port",
                        "type": "port",
                        "formLabel": "Redis Port"
                    }],
                    "formLabel": "Redis"
                }, {
                    "name": "Custom",
                    "type": "object",
                    "properties": [{
                        "name": "ipAddress",
                        "type": "ip",
                        "formLabel": "property1"
                    }, {
                        "name": "port",
                        "type": "port",
                        "formLabel": "property2"
                    }],
                    "formLabel": "Custom"
                }]
            }]
        }];



        $scope.section.generateObject = function (src, target) {
            if (src.type == "anyOf") {
                if (src.properties != undefined) {
                    var properties = src.properties;
                    for (var i = 0; i < properties.length; i++) {
                        var property = properties[i];
                        if (property.selected) {
                            if (!target[src.name]) target[src.name] = {};
                            target[src.name] = $scope.section.generateObject(property, target[src.name])
                        }
                    }
                }
            }
            else if (src.type == "object") {
                if (src.properties) {
                    for (var i = 0; i < src.properties.length; i++) {
                        if (!target[src.name]) target[src.name] = {};
                        target[src.name] = $scope.section.generateObject(src.properties[i], target[src.name]);
                    }
                }
                else {
                    target[src.name] = {};
                    //console.log(target);
                }
            }
            else {
                target[src.name] = src.value;
            }
            return target;
        }



        $scope.section.generate = function () {
            var target = {};
            target = $scope.section.generateObject($scope.section.items[0], target);

            console.log(target);
            console.log($scope.section.items[0]);
        }

    })


    .directive("waSection", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "www/views/partials/section/index.html"
        };
    })

    .directive("waForm", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "www/views/partials/form/index.html"
        };
    })

    .directive("waSimpleFormItem", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "www/views/partials/form/formItem/simple.html"
        };
    })

    .directive("waObjectFormItem", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "www/views/partials/form/formItem/object.html"
        };
    })

    .directive("waAnyOfFormItem", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "www/views/partials/form/formItem/anyOf.html"
        };
    })
