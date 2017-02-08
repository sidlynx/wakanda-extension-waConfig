var app = require("../../");

app
    .directive("waSimpleFormItem", function (FileFactory, $timeout) {
        return {
            restrict: "AEC",
            scope: {
                schema: "=",
                model: "="
            },
            transclude: true,
            link: function (scope, element, attrs) {
                if (scope.model === undefined || typeof (scope.model) === "object") {
                    scope.model = "";
                }
                if (scope.schema.type === "file") {
                    scope.schema.code = FileFactory.loadText(scope.schema.path).then(function (content) {
                        scope.model = content;
                        //scope.$apply();
                    })
                }
            },
            templateUrl: "views/partials/form/formItem/simple.html"
        };
    })
