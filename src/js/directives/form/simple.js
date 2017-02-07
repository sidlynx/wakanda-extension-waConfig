var app = require("../../");

app
    .directive("waSimpleFormItem", function (FileFactory) {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "="
            },
            link: function (scope, element, attrs) {

                if (!scope.model) {
                    scope.model = "";
                }
                if (scope.schema.type === "file") {
                    scope.schema.code = FileFactory.loadText(scope.schema.path).then(function (content) {
                        scope.model = content;
                    })
                }
            },
            templateUrl: "views/partials/form/formItem/simple.html"
        };
    })
