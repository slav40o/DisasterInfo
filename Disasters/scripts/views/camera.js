/* window, kendo */

(function (global) {
    var app = global.app = global.app || {};

    var PicturesViewModel = kendo.data.ObservableObject.extend({
        title: 'Pictures',

        takePicture: function () {
            navigator.camera.getPicture(function (imageData) {
                var image = document.getElementById('imageInput');
                image.src = "data:image/jpeg;base64," + imageData;
                console.dir(imageData);
                localStorage.setItem("img1.jpg", image.value);
            }, function (message) {
                alert('Failed because: ' + message);
            }, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            })
        },
    });
    app.pictures = {
        model: new PicturesViewModel()
    }
})(window);

//localStorageApp.prototype = {
//	run:function() {
//		var that = this;
//		document.getElementById("savePicture").addEventListener("click", function() {
//			that._insertVariable.apply(that, arguments);
//		});
//	},


//	_insertVariable: function () {
//	    navigator.camera.getPicture(onSuccess, onFail, {
//	        quality: 50,
//	        destinationType: Camera.DestinationType.DATA_URL
//	    });

//		var variableNameInput = document.getElementById("pictureNameInput"),
//		valueInput = document.getElementById("imageInput");

//		localStorage.setItem(variableNameInput.value, valueInput.value);
//		variableNameInput.value = "";
//		valueInput.value = "";

//		function onSuccess(imageData) {
//		    var image = document.getElementById('imageInput');
//		    image.src = "data:image/jpeg;base64," + imageData;
//		    console.dir(imageData);
//		}

//		function onFail(message) {
//		    alert('Failed because: ' + message);
//		}
//	}
//}

//localStorageApp.run();