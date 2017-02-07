var app = require("../../");

app
    .directive("waAnyOfFormItem", function () {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "="
            },
            link: function (scope, element, attrs) {
                console.log("any");
                console.log("before");
                console.log("schema");
                console.log(scope.schema);
                console.log("model");
                console.log(scope.model);

                if (!scope.model) {
                    scope.model = {};
                }
                if (!scope.model[scope.schema.name]) {
                    scope.model[scope.schema.name] = {};
                }

                console.log("after");
                console.log("schema");
                console.log(scope.schema);
                console.log("model");
                console.log(scope.model);

            },
            templateUrl: "views/partials/form/formItem/anyOf.html"
        };
    })
