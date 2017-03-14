var app = require("../../");

app
    .directive("waForm", function ($timeout,FileFactory,Flash) {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "=",
                holder : "="
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

                scope.generate = function () {
                    console.log(scope.holder);
                    var result = {};
                    result[scope.holder] = scope.model;
                    FileFactory.saveText(JSON.stringify(result,null,"\t"), "backend.json");
                    var message = '<strong>Success!</strong> Files generated successfully.';
                    var id = Flash.create('success', message, 3000, {
                        class: 'custom-class',
                        id: 'custom-id'
                    }, true);
                }

            },
            templateUrl: "views/partials/form/index.html"
        };
    })

require("./any");
require("./object");
require("./simple");
require("./array");
