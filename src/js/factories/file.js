var app = require("../");

app
    .factory("FileFactory", function () {
        var FileFactory = {
            loadText: function (path) {
                var content = studio.loadText(studio.solutionFolderPath + path);
                return content;
            },
            saveText: function (textContent, path) {
                studio.saveText(textContent, studio.solutionFolderPath + path);
            }
        };
        return FileFactory;
    })
