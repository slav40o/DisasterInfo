/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var AlertViewModel = kendo.data.ObservableObject.extend({
        alertsDataSource: null,
        init: function () {
            var that = this;
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "data/alerts.json",
                        dataType: "json"
                    }
                }
            });

            that.set("alertsDataSource", app.data);
        },
        showDetail: function (e) {
            var that = new AlertViewModel();

            var data = that.get("alertsDataSource");

            app.data.fetch(function () {
                var id = e.view.params.uid;
                var model = data.at(parseInt(id) - 1);
                kendo.bind(e.view.element, model, kendo.mobile.ui);
            });
        },
    });

    //TO DO: Set the model view to the app obejct!!!

    app.alerts = {
        viewModel: new AlertViewModel()
    };

    //JUST FOR TEST
    //app.models = {};
    //app.models.alerts = { title: "Alerts"};

})(window);