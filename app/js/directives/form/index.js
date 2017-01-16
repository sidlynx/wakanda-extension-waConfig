var app = require("../../");

app
    .directive("waForm", function() {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function(scope, element, attrs) {
              console.log("form");
            },
            templateUrl: "www/views/partials/form/index.html"
        };
    })

require("./any");
require("./object");
require("./simple");
