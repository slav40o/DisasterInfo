/* window, kendo */

(function (global) {
    var app = global.app = global.app || {},
        map,
        MapViewModel;

    MapViewModel = kendo.data.ObservableObject.extend({
        _isLoading: false,
        location: null,
        
        loadMarkers: function () {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "data/alerts.json",
                        dataType: "json"
                    }
                }
            });

            var alerts = dataSource.fetch(
                function (data) {
                    var items = data.items;

                    for (var i = 0; i < items.length; i++) {
                        if (!(items[i].isActive)) {
                            continue;
                        }
                        
                        var image,
                            position;

                        image = defineImage(items[i].type);
                        position = new google.maps.LatLng(items[i].lat, items[i].long);
                        titie = items[i].type;

                        var marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: position,
                            icon: image
                        });

                        var circleOptions = {
                            strokeColor: defineColor(items[i].type),
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            map: map,
                            center: position,
                            radius: items[i].area * 1000
                        };

                        circle = new google.maps.Circle(circleOptions);
                    }

                    function defineImage(type) {
                        switch (type) {
                            case 'Storm': return 'images/disaster-icons/storm.png';
                            case 'Zombie Attack': return 'images/disaster-icons/zombie-attack.png';
                            case 'Alien Invasion': return 'images/disaster-icons/alien-invasion.png';
                            case 'Fire': return 'images/disaster-icons/fire.png';
                            case 'Flood': return 'images/disaster-icons/flood.png';
                            case 'Heat wave': return 'images/disaster-icons/heat.png';
                            case 'Cold': return 'images/disaster-icons/cold.png';
                            case 'Earthquake': return 'images/disaster-icons/earthquake.png';
                            case 'Meteor': return 'images/disaster-icons/meteor.png';
                            case 'Snow storm': return 'images/disaster-icons/snow-storm.png';
                            case 'Thunder storm': return 'images/disaster-icons/thinder-storm.png';
                            case 'Tornado': return 'images/disaster-icons/tornado.png';
                            case 'War': return 'images/disaster-icons/war.png';
                            case 'Eruption': return 'images/disaster-icons/eruption.png';
                            default: return 'images/disaster-icons/meteor.png';
                        }
                    }

                    function defineColor(type) {
                        switch (type) {
                            case 'Storm': return '#020f7f';
                            case 'Zombie Attack': return '#7f351a';
                            case 'Alien Invasion': return '#006307';
                            case 'Fire': return '#e52200';
                            case 'Flood': return '#60a8ff';
                            case 'Heat wave': return '#ffba60';
                            case 'Cold': return '#60fff4';
                            case 'Earthquake': return '#ffca60';
                            case 'Meteor': return '#0f0000';
                            case 'Snow storm': return '#ffffff';
                            case 'Thunder storm': return '#12009b';
                            case 'Tornado': return '#12009b';
                            case 'War': return '#b20000';
                            case 'Eruption': return '#ff5a07';
                            default: return '#020f7f';
                        }
                    }
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

        zoomMap: function(change){
            var currentZoom = map.getZoom();
            map.setZoom(currentZoom + change);
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
                // minZoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },

                mapTypeControl: false,
                streetViewControl: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            app.mapService.viewModel.loadMarkers.apply(app.mapService.viewModel, []);
            app.mapService.viewModel.navigateHome.apply(app.mapService.viewModel, []);

            document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
            document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);

            function onVolumeUpKeyDown() {
                app.mapService.viewModel.zoomMap.apply(app.mapService.viewModel, [1]);
            }

            function onVolumeDownKeyDown() {
                app.mapService.viewModel.zoomMap.apply(app.mapService.viewModel, [-1]);
            }
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