/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var HomeViewModel = kendo.data.ObservableObject.extend({
        title: 'Home',

        checkForAlerts: function () {
            var that = this,
                dataSource = app.dataInstance();

            if (navigator.connection.type == 'unknown' || 
                navigator.connection.type == 'none') {

                navigator.notification.alert("No interner connection!", function () { }, "Network error", 'OK');
            }
            else {
                navigator.geolocation.getCurrentPosition(
                manageCoordinateds,
                manageError,
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                });
            }
            

            function manageError(error) {
                navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
            }

            function manageCoordinateds(position) {
                var currPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                dataSource.fetch(
                    function (data) {
                        var items = data.items;
                        var count = 0;
                        for (var i = 0; i < items.length; i++) {
                            if (!(items[i].isActive)) {
                                continue;
                            }

                            var disatance = calclateDistance(currPos, new google.maps.LatLng(items[i].lat, items[i].long));
                            if (disatance / 1000 < items[i].area) {
                                count++;
                            }
                        }

                        if (count < 1) {
                            navigator.notification.alert("Everything is okay!",
                                 function () { }, "Dangers check", 'OK');
                        }
                        else {
                            var message = (count == 1) ? " Danger spot around you!" : " Danger spots around you!";
                            navigator.notification.alert(count + message,
                                 function () { }, "Dangers check", 'OK');
                        }
                    }
                );
            }

            function calclateDistance(position, disasterPos) {
                var lat = [position.lat(), disasterPos.lat()]
                var lng = [position.lng(), disasterPos.lng()]
                var R = 6378137;
                var dLat = (lat[1] - lat[0]) * Math.PI / 180;
                var dLng = (lng[1] - lng[0]) * Math.PI / 180;
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return Math.round(d);
            }
        }
    });

    app.home = {
        model: new HomeViewModel()
    }

})(window);