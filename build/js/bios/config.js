/**
* This module provides configuration items for the loader
* @module bios/config
*/
define(["require", "exports"], function(require, exports) {
    /**
    * @type String
    */
    exports.loadingTmpl = [
        '<div class="loading">',
        '<span class="text"></span><span class="cursor">&nbsp;</span>',
        '</div>'
    ].join('');

    /**
    * @type String
    */
    exports.loadingMsg = 'Loading jscriptcoder.com. Please wait...';

    /**
    * We add some delay before the system is loaded
    * @type Number
    */
    exports.delayBeforeLoading = 3000;

    /**
    * List of dependencies to load
    * @type String[]
    */
    exports.systemDeps = ['../system/sysinit'];
});
