require.config({

    paths: {
        jasmine: '../bower_components/jasmine/lib/jasmine-core/jasmine',
        jasmineHtml: '../bower_components/jasmine/lib/jasmine-core/jasmine-html',
        boot: '../bower_components/jasmine/lib/jasmine-core/boot',
    },
        
    shim: {
        jasmine: { exports: 'jasmine'},
        jasmineHtml: ['jasmine'],
        boot: [ 'jasmine', 'jasmineHtml' ]
    }
});

require(['boot'], function() {
    
    require([

        'specs/wrapperSpec',
        'specs/promptSpec',
        'specs/outputSpec'

    ], window.onload);
    
});