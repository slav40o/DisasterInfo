(function (global) {
    var app = global.app = global.app || {};
    var MusicViewModel = kendo.data.ObservableObject.extend({
        mediaContent: null,
        isPlaying: false,

        play: function () {
            var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";
            var media = new Media(src, onSuccess, onError);
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
    });
    app.music = {
        model: new MusicViewModel()
    }
})(window);