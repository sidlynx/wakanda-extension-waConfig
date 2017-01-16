var app = require("../");

app
    .factory("FileFactory", function() {
        var FileFactory = {
            loadText: function(path) {
                var content = studio.loadText(path);
                return content;
            },
            writeText: function(textContent, path) {
                studio.saveText(textContent, path);
            }
        };
        return FileFactory;
    })
