(function (global) {
    var app = global.app = global.app || {};

    // simple object
    app.models = app.models || {};
    app.models.home = { title: 'Home' };
    app.models.settings = { title: 'Settings' };
    app.models.about = { title: 'About'};

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        //app.data = new kendo.data.DataSource({
        //    transport: {
        //        read: {
        //            url: "data/alerts.json",
        //            dataType: "json"
        //        }
        //    }
        //});

        app.kendoApp = new kendo.mobile.Application(document.body, {
            skin: 'flat',
            initial: 'views/home.html'
        });

    }, false);

}(window));