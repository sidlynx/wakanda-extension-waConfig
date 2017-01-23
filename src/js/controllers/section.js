var app = require("../");

app
    .controller("SectionCtrl", function ($scope, FileFactory) {
        $scope.section = {};
        $scope.section.items = [{
            "name": "Cache",
            "type": "object",
            "properties": [{
                "name": "engine",
                "type": "anyOf",
                "properties": [{
                    "name": "local",
                    "type": "object",
                    "formLabel": "Local"
                },
                {
                    "name": "Redis",
                    "type": "object",
                    "properties": [{
                        "name": "ipAddress",
                        "type": "ip",
                        "value": "",
                        "formLabel": "Redis Ip address",
                        "formTip": "Enter your Redis IPV4, IPV6 or hostname",
                        "formError": "Invalid IP format"
                    }, {
                        "name": "port",
                        "type": "port",
                        "value": "",
                        "formLabel": "Redis Port",
                        "formTip": "Enter your Redis port",
                        "formError": "Invalid Port number"
                    }],
                    "formLabel": "Redis"
                },
                {
                    "name": "Custom",
                    "type": "object",
                    "properties": [{
                        "name": "code",
                        "type": "file",
                        "pathOld": "backend/modules/wakanda-cache-custom/index.json",
                        "path": "customCache.js",
                        "value": `exports.set = function(key, value){
    // set() method is called when the Wakanda server needs to save data in the cache
    // Type your code here
};

exports.get = function(key) {
    // get() method is called when the Wakanda server needs to retrieve data from the cache
    // Type your code here
};

exports.del = function(key) {
    // del() method is called when the Wakanda server needs to delete data from the cache
    // Type your code here
};`,
                        "formLabel": "File"
                    }],
                    "formLabel": "Custom"
                }
                ]
            }]
        }];

        $scope.section.generateObject = function (src, target) {
            if (src.type == "anyOf") {
                if (src.properties != undefined) {
                    var properties = src.properties;
                    for (var i = 0; i < properties.length; i++) {
                        var property = properties[i];
                        if (property.selected) {
                            if (!target[src.name]) target[src.name] = {};
                            target[src.name] = $scope.section.generateObject(property, target[src.name])
                        }
                    }
                } else {

                }
            } else if (src.type == "object") {
                if (src.properties) {
                    var properties = src.properties;
                    for (var i = 0; i < properties.length; i++) {
                        if (!target[src.name]) target[src.name] = {};
                        target[src.name] = $scope.section.generateObject(src.properties[i], target[src.name]);
                    }
                } else {
                    target[src.name] = {};
                }
            } else if (src.type == "file") {
                var content = src.value;
                if (content != undefined) {
                    FileFactory.saveText(content, src.path);
                }
            } else {
                target[src.name] = src.value;
            }
            return target;
        };

        $scope.section.generate = function () {
            var target = {};
            target = $scope.section.generateObject($scope.section.items[0], target);

            try {
                var textConfig = JSON.stringify(target);
                FileFactory.saveText(textConfig, "config.json");
            } catch (e) {
                console.log(e);
            }

        };


        $scope.loadObject = function(){

        }
        $scope.section.load = function () {

        };

    })
