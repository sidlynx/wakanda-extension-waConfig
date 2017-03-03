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

                    scope.schema.value = "";
                    if (scope.schema.default !== undefined) {
                        scope.schema.value = scope.schema.default;
                    }
                }
                else {
                    scope.schema.value = scope.model;
                }
                if (scope.schema.type === "file") {
                    FileFactory.loadText(scope.schema.path).then(function (content) {
                        if (content === "") {
                            if (scope.schema.value !== undefined) {
                                content = scope.schema.value;
                            }
                            FileFactory.saveText(content, scope.schema.path);
                        }
                    }, function (error) {
                        var content = "";
                        if (scope.schema.value !== undefined) {
                            content = scope.schema.value;
                        }
                        FileFactory.saveText(content, scope.schema.path);
                    })
                    /*
                    scope.schema.code = FileFactory.loadText(scope.schema.path).then(function (content) {
                        scope.model = content;
                        if (scope.model === "" && scope.schema.value !== undefined) {
                            scope.model = scope.schema.value;
                        }
                    }, function (error) {
                        if (scope.model === "" && scope.schema.value !== undefined) {
                            scope.model = scope.schema.value;
                        }
                    })
                    //*/
                }
            },
            templateUrl: "views/partials/form/formItem/simple.html"
        };
    })
