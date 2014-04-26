/**
 * This module provides configuration items for the loader
 * @module bios/config
 */

/**
 * @type String
 */
export var loadingTmpl = [
    '<div class="loading">',
        '<span class="text"></span><span class="cursor">&nbsp;</span>',
    '</div>'
].join('');

/**
 * @type String
 */
export var loadingMsg = 'Loading jscriptcoder.com. Please wait...';

/**
 * We add some delay before the system is loaded
 * @type Number
 */
export var delayBeforeLoading = 0;

/**
 * List of dependencies to load
 * @type String[]
 */
export var systemDeps = ['../system/sysinit'];

/**
 * Delay, in milliseconds, per each keystroke
 * @type Number
 */
export var typingSpeedDelay = 60;

/**
 * @type String
 */
export var screenElemId = 'screen';