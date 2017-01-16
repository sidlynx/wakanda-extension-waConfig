var app = require("../../");

app
    .directive("waSimpleFormItem", function() {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function(scope, element, attrs) {
              console.log("simple");
            },
            templateUrl: "www/views/partials/form/formItem/simple.html"
        };
    })
