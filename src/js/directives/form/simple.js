var app = require("../../");

app
    .directive("waSimpleFormItem", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "views/partials/form/formItem/simple.html"
        };
    })
