(function () {
    "use strict";

    WinJS.Application.onsettings = function (e) {

        e.detail.applicationcommands = {
            "help": {
                href: "/pages/settings/settings.html",
                title: "Options sauvegarde des colis"
            }
        }

        WinJS.UI.SettingsFlyout.populateSettings(e);
    };


    var items = [];

    WinJS.Namespace.define("Steps.ListView", {
        data: new WinJS.Binding.List(items)
    });

    window.addEventListener("resize", onResize);


    function onResize() { 
        // Update view for the new window size 
        updateView(); 
    }

    function updateView() {
        // Query for the current view state 
        var myViewState = Windows.UI.ViewManagement.ApplicationView.value;

        var viewStates = Windows.UI.ViewManagement.ApplicationViewState;
        var statusText;

        // Assign text according to view state 
        switch (myViewState) {
        case viewStates.snapped:
            YeahToast.show({ title:"This app is snapped!" });
            break;
        case viewStates.filled:
            YeahToast.show({ title: "This app is in filled state!" });
            break;
        case viewStates.fullScreenLandscape:
            //YeahToast.show({ title: "This app is full screen landscape!" });
            break;
        case viewStates.fullScreenPortrait:
            YeahToast.show({ title: "This app is full screen portrait!" });
            break;
        default:
            YeahToast.show({ title: "Error: Invalid view state returned." });
            break;
        }
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {

            var trackButton = document.querySelector("#track_button");
            trackButton.addEventListener("click", function (evt) {

                var carrier_uuid = $("#carrier_uuid_box").val();
                var code_tracking = $("#code_tracking_textbox").val();

                if (carrier_uuid.length === 0 || code_tracking.length === 0) {
                    YeahToast.show({ title: "Needed values", textContent: "Please fill out the form." });
                } else {
                    $("#loader").show();
                }

                track(carrier_uuid, code_tracking, function (response) {

                    $("#loader").hide();

                    var steps = [];
                    if (response.steps) {
                        steps = response.steps;
                    }

                    items = [];
                    steps.forEach(function (step) {
                        items.push({
                            picture: "/images/location.png",
                            title: step.location,
                            text: step.status
                        });
                    });

                    console.log(JSON.stringify(items));

                    var datalist = new WinJS.Binding.List(items);

                    stepsList.winControl.itemDataSource = datalist.dataSource;

                    console.log(JSON.stringify(YeahToast));

                    if (items.length === 0) {
                        YeahToast.show({ title: "No found results", textContent: "Sorry, we couldn't find any result." });
                    } else {
                        YeahToast.show({ title: "Query completed", textContent: "Your parcel has been successfully tracked" });
                    }

                }, true);
            });
            
        }
    });
})();
