var app = require("../");

app
    .controller("SectionCtrl", function ($scope, FileFactory, Flash,$timeout) {
        $scope.section = {};
        $scope.section.schemaOld = {
            "name": "Cache",
            "type": "object",
            "properties": [{
                "name": "engine",
                "type": "anyOf",
                "properties": [{
                    "name": "local",
                    "type": "object",
                    "label": "Local"
                },
                {
                    "name": "Redis",
                    "type": "object",
                    "hideable": true,
                    "properties": [{
                        "name": "ipAddress",
                        "type": "ip",
                        "value": "",
                        "label": "Redis Ip address",
                        "tip": "Enter your Redis IPV4, IPV6 or hostname",
                        "error": "Invalid IP format"
                    }, {
                        "name": "port",
                        "type": "port",
                        "value": "",
                        "label": "Redis Port",
                        "tip": "Enter your Redis port",
                        "error": "Invalid Port number"
                    }],
                    "label": "Redis"
                },
                {
                    "name": "Custom",
                    "type": "object",
                    "hideable": true,
                    "properties": [{
                        "name": "code",
                        "type": "file",
                        "path": "modules/wakanda-cache-custom/index.js",
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
                        "label": "File"
                    }],
                    "label": "Custom"
                }
                ]
            }]
        };


        $scope.section.schema = {
            "name": "Cache",
            "label": "Cache",
            "type": "object",
            "properties": [{
                "name": "providers",
                "label": "Providers",
                "type": "array",
                "properties": [{
                    "name": "local",
                    "type": "object",
                    "label": "Local",
                    "hideable" : true,
                    "hideProperty" : "enabled",
                    "properties": [
                        {
                            "label": "enabled",
                            "name": "enabled",
                            "type": "boolean",
                            "hidden": true,
                            "value": false
                        },
                        {
                            "label": "title",
                            "name": "title",
                            "type": "string",
                            "hidden": true,
                            "value": "Local"
                        },
                        {
                            "label": "name",
                            "name": "name",
                            "type": "string",
                            "hidden": true,
                            "value": "wakanda-cache-local"
                        }
                    ]
                },
                {
                    "name": "Redis",
                    "type": "object",
                    "hideable": true,
                    "hideProperty" : "enabled",
                    "properties": [
                        {
                            "label": "enabled",
                            "name": "enabled",
                            "type": "boolean",
                            "hidden": true,
                            "value": false
                        },
                        {
                            "label": "title",
                            "name": "title",
                            "type": "string",
                            "hidden": true,
                            "value": "Redis"
                        },
                        {
                            "label": "name",
                            "name": "name",
                            "type": "string",
                            "hidden": true,
                            "value": "wakanda-cache-redis"
                        },
                        {
                            "name": "data",
                            "type": "object",
                            "properties":

                            [
                                {
                                    "name": "hostname",
                                    "type": "ip",
                                    "value": "127.0.0.1",
                                    "label": "Redis Ip address/host name",
                                    "tip": "Enter your Redis IPV4, IPV6 or hostname",
                                    "error": "Invalid IP format"
                                }, {
                                    "name": "port",
                                    "type": "port",
                                    "value": 6379,
                                    "label": "Redis Port",
                                    "tip": "Enter your Redis port",
                                    "error": "Invalid Port number"
                                }
                            ]
                        }
                    ],
                    "label": "Redis"
                },
                {
                    "name": "Custom",
                    "type": "object",
                    "hideable": true,
                    "hideProperty" : "enabled",
                    "properties": [
                        {
                            "label": "enabled",
                            "name": "enabled",
                            "type": "boolean",
                            "value" : false,
                            "hidden": true
                        },
                        {
                            "label": "title",
                            "name": "title",
                            "type": "string",
                            "value" : "Custom",
                            "hidden": true
                        },
                        {
                            "label": "name",
                            "name": "name",
                            "type": "string",
                            "value" : "wakanda-cache-custom",
                            "hidden": true
                        },
                        {
                            "name": "code",
                            "type": "file",
                            "path": "modules/wakanda-cache-custom/index.js",
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
                            "label": "File"
                        }],
                    "label": "Custom"
                }
                ]
            }]
        };

        $scope.section.model = {
            "Cache": {
                "engine": {
                    "local": {},
                    "Redis": {
                        "ipAddress": "192.168.2.2",
                        "port": "85"
                    },
                    "Custom": {}
                }
            }
        };

        $scope.section.model = {};

        $scope.section.submit = function () {
            $timeout(function(){
                $scope.$apply();
                console.log($scope.section.model);
            },0)
            
            FileFactory.saveText(JSON.stringify($scope.section.model), "backend.waConfig");
            var message = '<strong>Success!</strong> Files generated successfully.';
            var id = Flash.create('success', message, 3000, {
                class: 'custom-class',
                id: 'custom-id'
            }, true);
        }

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
                /*
                var content = src.value;
                if (content != undefined) {
                    FileFactory.saveText(content, src.path);
                }
                //*/
            } else {
                target[src.name] = src.value;
            }
            return target;
        };

        $scope.section.generate = function () {
            var target = {};
            target = $scope.section.generateObject($scope.section.schema, target);
            FileFactory.saveText(JSON.stringify(target), "backend.json");
            var message = '<strong>Success!</strong> Files generated successfully.';
            var id = Flash.create('success', message, 3000, {
                class: 'custom-class',
                id: 'custom-id'
            }, true);
            console.log(target);
            /*
                        try {
                            var textConfig = JSON.stringify(target);
                            FileFactory.saveText(textConfig, "config.json");
                            var message = '<strong>Success!</strong> Files generated successfully.';
                            var id = Flash.create('success', message, 0, {
                                class: 'custom-class',
                                id: 'custom-id'
                            }, true);
                        } catch (e) {
                            var message = '<strong>Error!</strong> An error occured while genarating files.';
                            var id = Flash.create('error', message, 0, {
                                class: 'custom-class',
                                id: 'custom-id'
                            }, true);
                            console.log(e);
                        }
            
                        //*/

        };


        $scope.loadObject = function () {

        }
        $scope.section.load = function () {

        };


        $scope.section.guid = function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        $scope.section.openFileInEditor = function (path) {
            console.log("called 2");
            FileFactory.openFileInEditor(path);
        }

    })
