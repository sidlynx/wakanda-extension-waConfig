/*
describe("directives", function () {
    var elm;
    var scope;
    beforeEach(module("waConfig"));



    beforeEach(inject(function ($rootScope, $compile) {
        elm = angular.element("<div><a>fgfgfg</a></div>");
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

    }))

    it("should have one div element", function () {
        console.log(elm)
        var divs = elm.find("a");
        expect(divs.length).toBe(5);
    })

})

//*/