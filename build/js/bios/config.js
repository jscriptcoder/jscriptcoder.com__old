/**
* This module provides configuration items for the loader
* @module bios/config
* @author Francisco Ramos <fran@jscriptcoder.com>
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
    exports.delayBeforeLoading = 0;

    /**
    * List of dependencies to load
    * @type String[]
    */
    exports.systemDeps = ['../system/sysinit'];

    /**
    * Delay, in milliseconds, per each keystroke
    * @type Number
    */
    exports.typingSpeedDelay = 60;

    /**
    * @type String
    */
    exports.screenElemId = 'screen';
});
