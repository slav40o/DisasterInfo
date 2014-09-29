(function (global) {
    var app = global.app = global.app || {};
    var MusicViewModel = kendo.data.ObservableObject.extend({
        media: null,
        isPlaying: false,

        play: function () {
            //var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";
            //var src = "http://www.uploadhosting.co/uploads/130.204.17.115/Stan - Kalokairini Drosia.mp3";
            //var src = "http://www.uploadhosting.co/uploads/130.204.17.115/AdeleSkyfallInstrumental.mp3";
            var src = "http://www.uploadhosting.co/uploads/130.204.17.115/Thrift Shop Instrumental.mp3";
            media = new Media(src, onSuccess, onError);
            media.play();

            function onSuccess() {
                console.log("playAudio():Audio Success");
            }

            // onError Callback 
            //
            function onError(error) {
                alert('code: ' + error.code + '\n' +
                      'message: ' + error.message + '\n');
            }
        },
        stop: function () {
            if (media) {
                media.stop();
            }
        }
    });
    app.music = {
        model: new MusicViewModel()
    }
})(window);