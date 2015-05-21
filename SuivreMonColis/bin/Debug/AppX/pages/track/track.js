(function () {
    "use strict";

    var items = [];

    WinJS.Namespace.define("Track.ListView", {
        data: new WinJS.Binding.List(items)
    });

    WinJS.UI.Pages.define("/pages/track/track.html", {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {

            var index = options.selectIndex;

            var deleteButton = document.querySelector('#deleteParcelButton');

            deleteButton.addEventListener("click", function(evt) {

                deleteParcel(index);

                WinJS.Navigation.navigate("/pages/parcels/parcels.html");

            });

            var item = getParcel(index);

            $("#code_tracking").text(item.code_tracking);
            $("#carrier_uuid").text(item.carrier_uuid);

            $("#loader").show();

            track(item.carrier_uuid, item.code_tracking, function (response) {

                $("#loader").hide();

                var steps = [];
                if (response.steps) {
                    steps = response.steps;
                }

                if (steps.length > 0) {
                    
                    items = [];
                    steps.forEach(function (step) {
                        items.push({
                            picture: "/images/location.png",
                            title: step.location,
                            text: step.status
                        });
                    });

                    var datalist = new WinJS.Binding.List(items);

                    trackList.winControl.itemDataSource = datalist.dataSource;

                    if (items.length === 0) {
                        YeahToast.show({ title: "No found results", textContent: "Sorry, we couldn't find any result." });
                    } else {
                        YeahToast.show({ title: "Query completed", textContent: "Your parcel has been successfully tracked" });
                    }

                }

            });
        }
    });
})();
