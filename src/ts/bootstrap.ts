require.config({
    baseUrl: '/build/js',
    paths: {
        backbone: '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        jquery: '/bower_components/jquery/dist/jquery'
    }
});

module Bootstrap {

    var $output = document.getElementById('output');
    var strLoading = 'Loading. Please wait...';
    var loadingIdx = 0;
    var interval;

    export function init() {
        interval = setInterval(() => {
            if (strLoading[loadingIdx]) {
                $output.innerHTML += strLoading[loadingIdx++];
            } else {
                clearInterval(interval);
                require(['app']);
            }
        }, 50);
    }
}

Bootstrap.init();