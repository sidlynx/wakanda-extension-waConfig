describe("waSimpleFormItem", function () {
    console.log('starting wasimple forms test');
    var elm;
    var scope;
    var $out;
    beforeEach(module("waConfig"));
    //beforeEach(module('views/partials/form/formItem/index.html'));
    beforeEach(module('views/index.html'));
    beforeEach(module('views/partials/form/formItem/simple.html'));



    beforeEach(inject(function ($rootScope, $compile, $timeout) {
        elm = angular.element(`
            <li wa-simple-form-item schema="schema"
        model="model"></li>
        `);
        scope = $rootScope;
        $out = $timeout;
    }))

    describe("Test simple input ip type", function () {
        beforeEach(inject(function ($compile) {
            scope.schema = {
                "name": "hostname",
                "type": "ip",
                "value": "127.0.0.1",
                "label": "Redis Ip address/host name",
                "tip": "Enter your Redis IPV4, IPV6 or hostname",
                "error": "Invalid IP format"
            };
            scope.model = "127.0.0.6";
            elm = $compile(elm)(scope);
            scope.$digest();
        }))

        it("Check label", function () {
            var labels = elm.find("label");
            expect(labels.length).toBe(1);
            expect(labels[0].innerText).toContain(scope.schema.label);

        })

        it("Check input", function () {

        })

        it("Check tip", function () {
            if (scope.schema.tip != undefined) {
                var elements = $(elm).find("i.icon-tooltip");
                expect(elements.length).toBe(1);
            }

        })

    })


    describe("Test simple input port type", function () {
        beforeEach(inject(function ($compile) {
            scope.schema = {
                "name": "port",
                "type": "port",
                "value": 6379,
                "label": "Redis Port",
                "tip": "Enter your Redis port",
                "error": "Invalid Port number"
            };
            scope.model = {};
            $compile(elm)(scope);
            scope.$digest();
        }))

        it("Check label", function () {
            var labels = elm.find("label");
            expect(labels.length).toBe(1);
            expect(labels[0].innerText).toContain(scope.schema.label);
        })

        it("Check input", function () {
            var inputs = elm.find("input");
            expect(inputs.length).toBe(1);
        })

        it("Check tip", function () {
            if (scope.schema.tip != undefined) {
                var elements = $(elm).find("i.icon-tooltip");
                expect(elements.length).toBe(1);
            }

        })



        it("Check tip", function () {
            $("input").val("tttt");

            $("input").trigger("input");

            console.log($(".icon-error"));

        })

    })

    describe("Test simple input boolean type", function () {
        beforeEach(inject(function ($compile) {
            scope.schema = {
                "label": "enabled",
                "name": "enabled",
                "type": "boolean",
                "hidden": false,
                "value": false
            };
            scope.model = {};
            $compile(elm)(scope);
            scope.$digest();
        }))

        it("Check input", function () {
            var inputs = elm.find("input");
            expect(inputs.length).toBe(1);
        })

    })

    describe("Test simple input string type", function () {
        beforeEach(inject(function ($compile) {
            scope.schema = {
                "label": "name",
                "name": "name",
                "type": "string",
                "hidden": false,
                "value": "wakanda-cache-redis"
            };
            scope.model = {};
            $compile(elm)(scope);
            scope.$digest();
        }))

        it("Check label", function () {
            var labels = elm.find("label");
            expect(labels.length).toBe(1);
            expect(labels[0].innerText).toContain(scope.schema.label);
        })

        it("Check input", function () {
            var inputs = elm.find("input");
            expect(inputs.length).toBe(1);
        })

        it("Check tip", function () {
            if (scope.schema.tip != undefined) {
                var elements = $(elm).find("i.icon-tooltip");
                expect(elements.length).toBe(1);
            }

        })

    })

    /*
        describe("Test simple input file type", function () {
            beforeEach(inject(function ($compile) {
                scope.schema = {
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
                };
                scope.model = {};
                $compile(elm)(scope);
                scope.$digest();
            }))
    
            it("Check button", function () {
                var buttons = elm.find("button");
                expect(buttons.length).toBe(1);
            })
        })
    
        //*/



})