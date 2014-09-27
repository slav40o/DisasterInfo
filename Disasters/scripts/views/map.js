/* window, kendo */

(function (global) {
    var app = global.app = global.app || {},
        map,
        MapViewModel;

    MapViewModel = kendo.data.ObservableObject.extend({
        _isLoading: false,
        location: null,
        markers: [],

        loadMarkers: function(){
            var alerts = app.data.fetch(
                function () {
                    // TO DO get coords and add marker
                }
            );
        },

        navigateHome: function(){
            var that = this,
                position;

            that._isLoading = true;
            that.showLoading();

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.panTo(position);

                    that._isLoading = false;
                    that.hideLoading();
                },
                function (error) {                    
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that._isLoading = false;
                    that.hideLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );
        },

        showLoading: function () {
            if (this._isLoading) {
                app.kendoApp.showLoading();
            }
        },

        hideLoading: function () {
            app.kendoApp.hideLoading();
        },

        _putMarker: function (position) {
            var that = this;

            that.markers.push(new google.maps.Marker({
                map: map,
                position: position
            }));
        }
    });

    app.mapService = {
        initMap: function () {
            var mapOptions = {
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },

                mapTypeControl: false,
                streetViewControl: false
            };

            // var data = 
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            app.mapService.viewModel.loadMarkers.apply(app.mapService.viewModel, []);
            app.mapService.viewModel.navigateHome.apply(app.mapService.viewModel, []);
        },

        show: function () {
            //show loading mask in case the location is not loaded yet 
            //and the user returns to the same tab
            app.mapService.viewModel.showLoading();

            //resize the map in case the orientation has been changed while showing other tab
            google.maps.event.trigger(map, "resize");
        },

        hide: function () {
            //hide loading mask if user changed the tab as it is only relevant to location tab
            app.mapService.viewModel.hideLoading();
        },

        viewModel: new MapViewModel()
    };
})(window);