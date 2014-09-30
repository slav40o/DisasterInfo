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
            var shootedByAnError = false;
            var disaster = {};
            if (document.getElementById('type').value.length >= 3) {
                disaster.type = document.getElementById('type').value;
                if (!shootedByAnError) {
                    document.getElementById('type').value = "";
                }
            } else {
                navigator.notification.alert("The type should be longer than 3 symbols!", function () { }, "Validation check", 'OK');
                shootedByAnError = true;
            }
            if (document.getElementById('info').value.length >= 10) {
                disaster.info = document.getElementById('info').value;
                if (!shootedByAnError) {
                    document.getElementById('info').value = "";
                }
            } else {
                navigator.notification.alert("The information about the disaster can not be shorter than 10 symbols!", function () { }, "Validation check", "OK");
                shootedByAnError = true;
            }
            if (!isNaN(parseFloat(document.getElementById('lat').value))) {
                disaster.lat = document.getElementById('lat').value;
                if (!shootedByAnError) {
                    document.getElementById('lat').value = "";
                }
            }
            else {
                navigator.notification.alert("Can not add string for one of the coordinates!", function () { }, "Validation check", "OK");
                shootedByAnError = true;
            }
            if (!isNaN(parseFloat(document.getElementById('long').value))) {
                disaster.long = document.getElementById('long').value;
                if (!shootedByAnError) {
                    document.getElementById('long').value = "";
                }
            } else {
                navigator.notification.alert("Can not add string for one of the coordinates!", function () { }, "Validation check", "OK");
                shootedByAnError = true;
            }
            if (!isNaN(parseInt(document.getElementById('area').value))) {
                disaster.area = document.getElementById('area').value;
                if (!shootedByAnError) {
                    document.getElementById('area').value = "";
                }
            } else {
                navigator.notification.alert("Cannot add string for the are range! It should be in kilometers, represented as an integer!", function () { }, "Validation check", "OK");
                shootedByAnError = true;
            }
            var imagePathLength = document.getElementById('imgPath').value.length;
            if (document.getElementById('imgPath').value.substring(imagePathLength - 3, imagePathLength).toLowerCase() === "jpg" ||
                document.getElementById('imgPath').value.substring(imagePathLength - 3, imagePathLength).toLowerCase() === "png" ||
                document.getElementById('imgPath').value.substring(imagePathLength - 4, imagePathLength).toLowerCase() === "jpeg") {
                disaster.imagePath = document.getElementById('imgPath').value;
                if (!shootedByAnError) {
                    document.getElementById('imgPath').value = "";
                }
            } else {
                navigator.notification.alert("You are allowed to add only .jpg, .jpeg and .png files!", function () { }, "Validation check", "OK");
                shootedByAnError = true;
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