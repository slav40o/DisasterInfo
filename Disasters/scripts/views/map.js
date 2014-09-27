/* window, kendo */

(function (global) {
    var app = global.app = global.app || {},
        map,
        MapViewModel;

    MapViewModel = kendo.data.ObservableObject.extend({
        _isLoading: false,
        location: null,
        markers: [],

        loadMarkers: function(markersPositions){

        },

        navigateHome: function(){

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

    app.locationService = {
        initLocation: function () {
            var mapOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },

                mapTypeControl: false,
                streetViewControl: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            app.locationService.viewModel.loadMarkers.apply(app.locationService.viewModel, []);
            app.locationService.viewModel.onNavigateHome.apply(app.locationService.viewModel, []);
        },

        show: function () {
            //show loading mask in case the location is not loaded yet 
            //and the user returns to the same tab
            app.locationService.viewModel.showLoading();

            //resize the map in case the orientation has been changed while showing other tab
            google.maps.event.trigger(map, "resize");
        },

        hide: function () {
            //hide loading mask if user changed the tab as it is only relevant to location tab
            app.locationService.viewModel.hideLoading();
        },

        viewModel: new LocationViewModel()
    };
})(window);