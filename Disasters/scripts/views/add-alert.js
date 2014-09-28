/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var AddAlertViewModel = kendo.data.ObservableObject.extend({
        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);


        },
        addAlert: function () {
            var disaster = {};
            disaster.type = document.getElementById('type').value;
            disaster.info = document.getElementById('info').value;
            disaster.lat = document.getElementById('lat').value;
            disaster.long = document.getElementById('long').value;
            disaster.area = document.getElementById('area').value;
            disaster.imagePath = document.getElementById('imagePath').value; //TO DO
            disaster.isActive = document.getElementById('isActive').value;  // TO DO
        },
    });

    //TO DO: Set the model view to the app obejct!!!
    app.addDisaster = {
        model: new AddAlertViewModel()
    }
})(window);