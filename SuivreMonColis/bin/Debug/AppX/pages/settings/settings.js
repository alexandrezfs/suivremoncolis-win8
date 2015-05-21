(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {

            var isSaveAuto = getIsSaveAuto();
            document.getElementById("saveAuto").winControl.checked = isSaveAuto;
            console.log(document.getElementById("saveAuto").winControl.checked);
        }
    });
})();

var toggleSaveAuto = function () {
    var obj = document.getElementById("saveAuto").winControl;
    console.log("SaveAuto toggled. Current status: " + (obj.checked ? "on" : "off"));

    var isSaveAuto;

    if (obj.checked) {
        isSaveAuto = true;
    } else {
        isSaveAuto = false;
    }

    localStorage.setItem("saveAuto", JSON.stringify(isSaveAuto));
}

// To protect against untrusted code execution, all functions are required to be marked as supported for processing before they can be used inside a data-win-options attribute in HTML markup.
WinJS.Utilities.markSupportedForProcessing(toggleSaveAuto);

WinJS.UI.processAll();

