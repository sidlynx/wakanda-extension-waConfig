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

                    if (scope.schema.value !== undefined) {
                        scope.model = scope.schema.value;
                    }

                    /*
                                        scope.schema.value = "";
                                        if (scope.schema.default !== undefined) {
                                            scope.schema.value = scope.schema.default;
                                        }
                                        //*/
                }
                else {
                    //scope.schema.value = scope.model;
                }


                if (scope.schema.type === "file") {
                    
                    //if file doesn't exist and the schema value isn't undefined,create the file with the default schema value
                    FileFactory.exists(scope.schema.path).then((fullPath) => {

                    }, (error) => {
                        if (typeof (scope.schema.value) === "string") {
                            FileFactory.saveText(scope.schema.value, scope.schema.path);
                        }
                    })

                    /**
                     * Opens the file in the studio editor
                     */
                    scope.openFileInEditor = function () {
                        FileFactory.exists(scope.schema.path).then((fullPath) => {
                            FileFactory.openFileInEditor(scope.schema.path);
                        }, (error) => {
                            if (typeof (scope.schema.value) === "string") {
                                FileFactory.saveText(scope.schema.value, scope.schema.path).then((content)=>{
                                    FileFactory.openFileInEditor(scope.schema.path);
                                })
                            }
                        })
                    }

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
