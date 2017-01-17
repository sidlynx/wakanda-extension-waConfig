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
            templateUrl: "views/partials/form/formItem/simple.html"
        };
    })
