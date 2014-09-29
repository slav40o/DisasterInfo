/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var AddAlertViewModel = kendo.data.ObservableObject.extend({
        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            that.set("addAlertsDataSource", app.data);
        },
        addAlert: function () {
            var disaster = {};
            disaster.type = document.getElementById('type').value;
            disaster.info = document.getElementById('info').value;
            disaster.lat = document.getElementById('lat').value;
            disaster.long = document.getElementById('long').value;
            disaster.area = document.getElementById('area').value;
            disaster.imagePath = document.getElementById('imgPath').value;
            disaster.isActive = document.getElementById('isActive').checked;
            disaster.id = Math.floor(Math.random() * (100 - 8) + 8);

            //app.data._data.push(JSON.stringify(disaster));
            app.data.add(disaster);
            //app.data.add({
            //    id: disaster.id,
            //    done: false,
            //    description: disaster
            //});

            //works only in IE...
            //var fso = new ActiveXObject("Scripting.FileSystemObject");
            //var jsonFile = fso.getFile("data/alerts.json");
            //jsonFile.WriteLine("This is a test");
            //jsonFile.close();
        },
        showDetails: function (e) {
            var that = new AddAlertViewModel();

            var data = that.get("addAlertsDataSource");

            app.data.fetch(function () {
                var id = e.view.params.uid;
                var model = data.at(parseInt(id) - 1);
                kendo.bind(e.view.element, model, kendo.mobile.ui);
            });
        },
    });

    //TO DO: Set the model view to the app obejct!!!
    app.addDisaster = {
        model: new AddAlertViewModel()
    }
})(window);