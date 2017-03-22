var app = require("../");

app
    .factory("FileFactory", function () {
        var factory = {};
        factory.getFullPath = function (path) {
            return new Promise(function (resolve, reject) {
                studio.currentSolution.getProjects().then((projectList) => {
                    var folderPath = studio.solutionFolderPath, fullPath;
                    folderPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
                    folderPath += "/";
                    try {
                        folderPath += JSON.parse(projectList)[0] + "/";
                    }
                    catch (e) {

                    }
                    fullPath = folderPath + path;
                    resolve(fullPath);
                })
            })
        };
        factory.exists = function (path) {
            return new Promise((resolve, reject) => {
                factory.getFullPath(path).then((fullPath) => {
                    if (fileExists(fullPath)) {
                        resolve(fullPath);
                    }
                    else {
                        reject("FILE_NOT_FOUND");
                    }
                }, (error) => {
                    reject(error);
                })
            })
            return fileExists(factory.getFullPath(path));
        };
        factory.loadText = function (path) {
            return new Promise((resolve, reject) => {
                factory.exists(path).then((fullPath) => {
                    studio.loadText(fullPath).then((content) => {
                        resolve(content);
                    }, function (error) {
                        reject(error);
                    })
                }, (error) => {
                    reject(error);
                })
            })
        };
        factory.saveText = function (textContent, path) {
            return new Promise((resolve, reject) => {
                factory.getFullPath(path).then((fullPath) => {
                    studio.saveText(textContent, fullPath).then((content) => {
                        resolve(content);
                    }, (error) => {
                        reject(error);
                    })
                }, (error) => {
                    reject(error);
                })
            })
        };
        factory.openFileInEditor = function(path){
            factory.getFullPath(path).then((fullPath)=>{
                studio.openFile(fullPath);
            },(error)=>{

            })
        }
        return factory;
    })