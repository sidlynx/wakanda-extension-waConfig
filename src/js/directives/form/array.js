var app = require("../../");

app
    .directive("waArrayFormItem", function ($timeout) {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "="
            },
            transclude: true,
            link: function (scope, element, attrs) {

                




            },
            templateUrl: "views/partials/form/formItem/array.html"
        };
    })
