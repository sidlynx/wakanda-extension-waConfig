var app = require("../../");

app
    .directive("waForm", function () {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "="
            },
            transclude: true,
            link: function (scope, element, attrs) {
                if (!scope.model) {
                    scope.model = {};
                }
                if (!scope.model[scope.schema.name]) {
                    //scope.model[scope.schema.name] = {};
                }

            },
            templateUrl: "views/partials/form/index.html"
        };
    })

require("./any");
require("./object");
require("./simple");
