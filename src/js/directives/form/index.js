var app = require("../../");

app
    .directive("waForm", function ($timeout, FileFactory, Flash) {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "=",
                holder: "="
            },
            transclude: true,
            link: function (scope, element, attrs) {
                if (!scope.model) {
                    scope.model = {};
                    $timeout(function () { scope.$apply() }, 0);
                }
                var properties = scope.schema.properties;
                for (var i = 0; i < properties.length; i++) {
                    var property = properties[i];
                    switch (property.type) {
                        case ("array"):
                            if (!scope.model[property.name]) {
                                scope.model[property.name] = [];
                                $timeout(function () { scope.$apply() }, 0);
                            }
                            break;
                        default:

                            break;
                    }

                }

                scope.saving = false;

                scope.generate = function () {
                    scope.saving = true;
                    $timeout(function () { scope.$apply() }, 0);
                    var result = {};
                    result[scope.holder] = scope.model;
                    FileFactory.saveText(JSON.stringify(result, null, "\t"), "backend.json").then((content) => {
                        var message = '<strong>Success!</strong> File generated successfully.';
                        Flash.create('success', message, 3000, {
                            class: 'custom-class',
                            id: 'custom-id'
                        }, true);
                        scope.saving = false;
                        $timeout(function () { scope.$apply() }, 0);
                    }, (error) => {
                        var message = '<strong>Error!</strong> File not generated.';
                        Flash.create('error', message, 3000, {
                            class: 'custom-class',
                            id: 'custom-id'
                        }, true);
                        scope.saving = false;
                        $timeout(function () { scope.$apply() }, 0);
                    })

                }

            },
            templateUrl: "views/partials/form/index.html"
        };
    })

require("./any");
require("./object");
require("./simple");
require("./array");
