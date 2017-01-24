
function init() {
    if (!studio.currentSolution || studio.currentSolution.getSolutionFile() === null) {
        studio.alert("No solution is open");
    }
		else {
        studio.extension.registerTabPage('build/index.html', 'icons\\icon_config_tree.png', 'Setup your config');

        var rememberInNextSession = true;
        var openOnLeft = false;
        var isBlackTheme = false;

        studio.extension.openPageInTab('build/index.html', 'Backend config', rememberInNextSession, openOnLeft, isBlackTheme, "studio::waConfig");
        return true;
    }
}

exports.handleMessage = function handleMessage(message) {
    "use strict";

    if (message.action == "init") {
        init();
    }
};
