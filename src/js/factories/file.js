var app = require("../");

app
    .factory("FileFactory", function () {
        var FileFactory = {
            loadText: function (path) {
                return new Promise(function (resolve, reject) {
                    if (fileExists(studio.solutionFolderPath + path)) {
                        studio.currentSolution.getProjects().then((projectList) => {
                            var folderPath = studio.solutionFolderPath;
                            folderPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
                            folderPath += "/";

                            try {
                                folderPath += JSON.parse(projectList)[0] + "/";
                            }
                            catch (e) {

                            }
                            studio.loadText(folderPath + path).then(function (content) {
                                resolve(content);
                            }, function (error) {
                                resolve("");
                            })
                        })
                    }
                    else {
                        resolve("");
                    }
                })
            },
            saveText: function (textContent, path) {
                return new Promise(function (resolve, reject) {
                    studio.currentSolution.getProjects().then((projectList) => {
                        var folderPath = studio.solutionFolderPath;
                        folderPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
                        folderPath += "/";

                        try {
                            folderPath += JSON.parse(projectList)[0] + "/";
                        }
                        catch (e) {

                        }
                        studio.saveText(textContent, folderPath + path).then((content)=>{
                            resolve(content);
                        },(error)=>{
                            reject(error);
                        })
                    },(error)=>{
                        reject(error);
                    })
                })
            }

        };
        return FileFactory;
    })
