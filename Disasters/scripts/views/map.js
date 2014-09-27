/* window, kendo */

(function (global) {
    var app = global.app = global.app || {},
        map,
        geocoder,
        MapViewModel;

    MapViewModel = kendo.data.ObservableObject.extend({
        _markers: null,
        _isLoading: false,
        location: null,


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

            if (that._lastMarker !== null && that._lastMarker !== undefined) {
                that._lastMarker.setMap(null);
            }

            that._lastMarker = new google.maps.Marker({
                map: map,
                position: position
            });
        }
    });

})(window);