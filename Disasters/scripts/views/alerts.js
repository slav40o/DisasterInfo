/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var AlertViewModel = kendo.data.ObservableObject.extend({
        alertsDataSource: null,

        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            var dataSource = app.dataInstance();

            that.set("alertsDataSource", app.data);
        },

        showDetails: function (e) {
            var that = new AlertViewModel();

            var data = that.get("alertsDataSource");

            app.data.fetch(function () {
                var id = e.view.params.uid;
                var model = data.at(parseInt(id) - 1);
                kendo.bind(e.view.element, model, kendo.mobile.ui);
            });
        },
    });

    app.alerts = {
        viewModel: new AlertViewModel()
    };

})(window);