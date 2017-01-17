var app = require("../");

app
    .directive("waSection", function() {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function(scope, element, attrs) {

            },
            templateUrl: "views/partials/section/index.html"
        };
    })
