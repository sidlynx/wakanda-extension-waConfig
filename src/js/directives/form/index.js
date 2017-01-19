var app = require("../../");

app
    .directive("waForm", function () {
        return {
            restrict: "AEC",
            scope: {
                model: "="
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: "views/partials/form/index.html"
        };
    })

require("./any");
require("./object");
require("./simple");
