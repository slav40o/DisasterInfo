/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var AlertViewModel = kendo.data.ObservableObject.extend({
        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);


        },
    });

    //TO DO: Set the model view to the app obejct!!!

    //JUST FOR THEST
    app.models = {};
    app.models.alerts = { title: "Alerts"};

})(window);