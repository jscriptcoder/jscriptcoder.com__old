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
    var $output = document.getElementById('output');
    var strLoading = 'Loading. Please wait...';
    var loadingIdx = 0;
    var interval;

    function init() {
        interval = setInterval(function () {
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
