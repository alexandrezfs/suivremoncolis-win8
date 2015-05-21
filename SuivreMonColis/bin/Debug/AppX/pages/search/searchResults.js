// TODO: connecter la page Résultats de la recherche à votre recherche dans l'application.
// Pour obtenir une présentation du modèle Page des résultats de recherche, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    WinJS.Namespace.define("SearchRes.ListView", {
        data: new WinJS.Binding.List()
    });

    WinJS.UI.Pages.define("/pages/search/searchResults.html", {

        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page.
        ready: function (element, options) {

            console.log(options.queryText);

            var pList = [];

            //getting parcels
            var parcels = getParcels();

            parcels.forEach(function (p) {

                if (p.carrier_uuid.indexOf(options.queryText) > -1 || p.code_tracking.indexOf(options.queryText) > -1)

                pList.push({
                    picture: "/images/location.png",
                    title: p.carrier_uuid,
                    text: p.code_tracking
                });

            });

            var datalist = new WinJS.Binding.List(pList);

            var searchList = document.querySelector("#searchList");
            searchList.winControl.itemDataSource = datalist.dataSource;
            searchList.winControl.oniteminvoked = itemHandler;

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