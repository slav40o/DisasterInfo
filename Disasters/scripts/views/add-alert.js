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
            if (document.getElementById('type').value.length >= 3) {
                disaster.type = document.getElementById('type').value;
                document.getElementById('type').value = "";
            } else {
                alert("The type should be longer than 3 symbols!");
            }
            if (document.getElementById('info').value.length >= 10) {
                disaster.info = document.getElementById('info').value;
                document.getElementById('info').value = "";
            } else {
                alert("The information about the disaster can not be shorter than 10 symbols!");
            }
            if (!isNaN(parseFloat(document.getElementById('lat').value))) {
                disaster.lat = document.getElementById('lat').value;
                document.getElementById('lat').value = "";
            }
            else {
                alert("Can not add string for one of the coordinates!");
            }
            if (!isNaN(parseFloat(document.getElementById('long').value))) {
                disaster.long = document.getElementById('long').value;
                document.getElementById('long').value = "";
            } else {
                alert("Can not add string for one of the coordinates!");
            }
            if (!isNaN(parseInt(document.getElementById('area').value))) {
                disaster.area = document.getElementById('area').value;
                document.getElementById('area').value = "";
            } else {
                alert("Cannot add string for the are range! It should be in kilometers, represented as an integer!");
            }
            var imagePathLength = document.getElementById('imgPath').value.length;
            if (document.getElementById('imgPath').value.substring(imagePathLength - 3, imagePathLength) === "jpg" ||
                document.getElementById('imgPath').value.substring(imagePathLength - 3, imagePathLength) === "png" ||
                document.getElementById('imgPath').value.substring(imagePathLength - 4, imagePathLength) === "jpeg") {
                disaster.imagePath = document.getElementById('imgPath').value;
                document.getElementById('imgPath').value = "";
            } else {
                alert("You are allowed to add only .jpg, .jpeg and .png files!");
            }
            disaster.isActive = document.getElementById('isActive').checked;
            document.getElementById('isActive').checked = false;
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