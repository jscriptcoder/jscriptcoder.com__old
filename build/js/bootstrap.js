/**
* Configure requirejs and bootstraps the application
* @module bootstrap
*/
require.config({
    baseUrl: '/build/js',
    paths: {
        backbone: '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        jquery: '/bower_components/jquery/dist/jquery'
    }
});

var Bootstrap;
(function (Bootstrap) {
    function init() {
        var $output = document.getElementById('output');
        var strLoading = 'Loading. Please wait...';
        var loadingIdx = 0;
        var interval = setInterval(function () {
            if (strLoading[loadingIdx]) {
                $output.innerHTML += strLoading[loadingIdx++];
            } else {
                clearInterval(interval);
                require(['app']);
            }
        }, 50);
    }
    Bootstrap.init = init;
})(Bootstrap || (Bootstrap = {}));

Bootstrap.init();
