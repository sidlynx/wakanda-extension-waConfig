var app = require("../../");

app
    .directive("waAnyOfFormItem", function () {
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
            templateUrl: "views/partials/form/formItem/anyOf.html"
        };
    })
