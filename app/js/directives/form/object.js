var app = require("../../");

app
    .directive("waObjectFormItem", function() {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function(scope, element, attrs) {

            },
            templateUrl: "www/views/partials/form/formItem/object.html"
        };
    })
