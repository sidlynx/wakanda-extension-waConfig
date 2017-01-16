require("./section");

var app = require("../");
app
    .controller("IndexCtrl", function($scope, $rootScope) {
        $scope.section = {};
        $scope.section.navigate = function(section) {
            $rootScope.navigator.goTo("/" + section);
        }
    })
