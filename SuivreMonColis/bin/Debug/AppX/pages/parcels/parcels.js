(function () {
    "use strict";

    //Display all parcels in a list view

    var items = [];

    WinJS.Namespace.define("Parcels.ListView", {
        data: new WinJS.Binding.List(items)
    });

    WinJS.UI.Pages.define("/pages/parcels/parcels.html", {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {

            var parcels = getParcels();
            var pList = [];

            parcels.forEach(function (parcel) {
                pList.push({
                    picture: "/images/location.png",
                    title: parcel.carrier_uuid,
                    text: parcel.code_tracking
                });
            });


            var datalist = new WinJS.Binding.List(pList);

            if (!parcelsList.winControl) {
                WinJS.Navigation.navigate("/pages/home/home.html");
            } else {
                parcelsList.winControl.itemDataSource = datalist.dataSource;
                parcelsList.winControl.oniteminvoked = itemHandler;
            }


            var trackButton = document.querySelector("#add_parcel_button");
            trackButton.addEventListener("click", function (evt) {

                var code_tracking = $("#code_tracking_textbox").val();
                var carrier_uuid = $("#carrier_uuid_box").val();

                if (carrier_uuid.length === 0 || code_tracking.length === 0) {
                    YeahToast.show({ title: "Needed values", textContent: "Please fill out the form." });
                } else {

                    addParcel(carrier_uuid, code_tracking);

                    var parcelsArr = getParcels();

                    var pList = [];

                    parcelsArr.forEach(function (parcel) {
                        pList.push({
                            picture: "/images/location.png",
                            title: parcel.carrier_uuid,
                            text: parcel.code_tracking
                        });
                    });

                    var datalist = new WinJS.Binding.List(pList);

                    parcelsList.winControl.itemDataSource = datalist.dataSource;

                }

            });

        }
    });
})();

function itemHandler(evt) {

    var selectIndex = evt.detail.itemIndex;

    console.log(selectIndex);

    //getting index in LS
    var parcels = getParcels();
    var item = parcels[selectIndex];

    //navigate to tracking page
    WinJS.Navigation.navigate("/pages/track/track.html", { selectIndex: selectIndex });

}