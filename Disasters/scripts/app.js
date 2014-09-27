(function (global) {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = global.app = global.app || {};

    // create an object to store the models for each view
    app.models = {
        home: {
            title: 'Home'
        },
        settings: {
            title: 'Settings'
        },
        about: {
            title: 'About'
        },
        map: {
            title: 'Map',
            initMap: function (e) {
                var myOptions = {
                    center: new google.maps.LatLng(-34.397, 150.644),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var mapElement = $("#map-canvas");
                var container = e.view.content;

                var map = new google.maps.Map(mapElement[0], myOptions);
            }
        },
        alerts: {
            title: 'Alerts'
        },
        addAlert: {
            title: 'Add Alert'
        },
        alertInfo: {
            title: 'Alert Info'
        }
    };
    

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app.kendoApp = new kendo.mobile.Application(document.body, {
            skin: 'flat',
            initial: 'views/home.html'
        });

    }, false);


}(window));