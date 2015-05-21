function getIsSaveAuto() {
    
    var isSaveAuto = localStorage.getItem("saveAuto");

    if (!isSaveAuto) {
        isSaveAuto = false;
    } else if (isSaveAuto == "true") {
        isSaveAuto = true;
    } else {
        isSaveAuto = false;
    }

    return isSaveAuto;

}