var app = require("../");

app.filter("reverse", function () {
    return function (string) {
        return string.split("").reverse().join("");
    }
})