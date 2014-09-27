
/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    app.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: "data/alerts.json",
                dataType: "json"
            }
        }
    });


})(window);