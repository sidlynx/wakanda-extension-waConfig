var app = require("../../");

app
    .directive("waAnyOfFormItem", function() {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function(scope, element, attrs) {

            },
            templateUrl: "www/views/partials/form/formItem/anyOf.html"
        };
    })
