function track(carrier_uuid, code_tracking, callback, is_home) {

    var url = "http://track.alexandrenguyen.fr/api/public/trackIt/" + carrier_uuid + "/" + code_tracking;

    console.log(url);

    jQuery.get(url, function (response) {

        if (!response.steps) {
            response.steps = [];
        }

        if (getIsSaveAuto() && is_home) {
            addParcel(carrier_uuid, code_tracking);
        }

        callback(response);

    });

}

function addParcel(carrier_uuid, code_tracking) {
 
    //save parcels.
    var parcelsStr = localStorage.getItem("parcels");
    var parcelsArr = [];

    console.log(parcelsArr);

    if (!parcelsStr) {
        parcelsArr = [];
        console.log(parcelsArr);
    } else {
        parcelsArr = JSON.parse(parcelsStr);
    }

    console.log(parcelsArr);

    parcelsArr.push({
        code_tracking: code_tracking,
        carrier_uuid: carrier_uuid
    });

    localStorage.setItem("parcels", JSON.stringify(parcelsArr));
    YeahToast.show({ title: "Parcel registered", textContent: "You successfully added a parcel !" });
}

function getParcels() {

    var parcelsStr = localStorage.getItem("parcels");
    console.log(parcelsStr);
    var parcels = JSON.parse(parcelsStr);

    if (!parcels) {
        parcels = [];
    }

    console.log("parcels:"+parcels);

    return parcels;
}

function deleteParcel(index) {
    
    var parcels = getParcels();
    parcels.splice(index, 1);

    localStorage.setItem("parcels", JSON.stringify(parcels));
}

function getParcel(index) {
    //getting index in LS
    var parcels = getParcels();
    var item = parcels[index];

    return item;
}