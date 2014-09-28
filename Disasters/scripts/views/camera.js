/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var PicturesViewModel = kendo.data.ObservableObject.extend({
        title: 'Pictures',

        //init: function () {
        //    var that = this;
        //    kendo.data.ObservableObject.fn.init.apply(that, []);
        //    that.loadAllPictures();
        //},

        takePicture: function () {
            navigator.camera.getPicture(function (imageData) {
                var image = document.getElementById('imageInput');
                image.src = "data:image/jpeg;base64," + imageData;
                console.dir(imageData);

                //save into localStorage
                var name = "img" + Math.floor((Math.random() * 10000) + 1);
                localStorage.setItem(name, imageData);

                //update the list with pictures
                var gallery = document.getElementById('gallery');
                var img = document.createElement("img");
                img.src = "data:image/jpeg;base64," + localStorage.getItem(name);
                img.width = 300;
                img.height = 200;
                var li = document.createElement("li");
                li.appendChild(img);
                gallery.appendChild(li);

                console.dir(localStorage);
            }, function (message) {
                alert('Failed because: ' + message);
            }, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            })
        },
        loadAllPictures: function () {
            var gallery = document.getElementById('gallery');
            var counter = 1;
            //while (localStorage.getItem("img" + counter) != undefined) {
            for (var i = 0; i < 10000; i++) {
                if (localStorage.getItem("img" + i) != null) {
                    var img = document.createElement("img");
                    img.src = "data:image/jpeg;base64," + localStorage.getItem("img" + i);
                    img.width = 300;
                    img.height = 200;
                    var li = document.createElement("li");
                    li.appendChild(img);
                    gallery.appendChild(li);
                    //gallery.appendChild(document.createElement("li").appendChild(document.createElement("img").src
                    //counter++;
                }
            }
        },
    });
    app.pictures = {
        model: new PicturesViewModel()
    }
})(window);