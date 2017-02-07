var app = require("../");

app
    .factory("FileFactory", function () {
        var FileFactory = {
            loadText: function (path) {
                return new Promise(function (resolve, reject) {
                    if (fileExists(studio.solutionFolderPath + path)) {
                        content = studio.loadText(studio.solutionFolderPath + path).then(function (content) {
                            resolve(content);
                        }, function (error) {
                            resolve("");
                        })
                    }
                    else {
                        resolve("");
                    }
                })
            },
            saveText: function (textContent, path) {
                studio.saveText(textContent, studio.solutionFolderPath + path);
            }
        };
        return FileFactory;
    })
