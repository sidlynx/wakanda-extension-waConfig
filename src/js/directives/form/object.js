var app = require("../../");

app
    .directive("waObjectFormItem", function () {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "="
            },
            link: function (scope, element, attrs) {
                /*
                if (!scope.model) {
                    scope.model = {};
                }
                if (!scope.model[scope.schema.name]) {
                    scope.model[scope.schema.name] = {};
                }
                //*/

            },
            templateUrl: "views/partials/form/formItem/object.html"
        };
    })
