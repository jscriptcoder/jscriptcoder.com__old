/**
 * @module bios/loader
 * @requires bios/config
 * @requires bios/bios
 */

import Config = require('./config');
import Bios = require('./bios');

/**
 * Booting functionality
 * @namespace Boot
 */
module Boot {

    /**
     * Loading element
     * @type HTMLElement
     */
    var loadingEl = Bios.appendDOMElement(Config.loadingTmpl);

    /**
     * Message element
     * @type HTMLElement
     */
    var txtEl = loadingEl.querySelector('.text');

    /**
     * Cursor element
     * I need to typecast due to an issue in lib.d.ts
     * @type HTMLElement
     */
    var cursorEl = <HTMLElement>loadingEl.querySelector('.cursor');

    /**
     * Different cursor modes
     * @enum String
     */
    enum TCursorMode { type, blink };
    
    /**
     * Changes the mode of the cursor (type|blink)
     * @param {String} mode
     */
    function cursorMode(mode) {
        
        console.log('[Boot - cursorMode] Changing cursor mode to', TCursorMode[mode]);
        
        var clsList = cursorEl.classList;
        clsList.remove(TCursorMode[TCursorMode.type]);
        clsList.remove(TCursorMode[TCursorMode.blink]);
        clsList.add(TCursorMode[mode]);
    }
    
    /**
     * Starts the application
     * @memberof Boot
     */
    export function start() {
        
        console.log('[Boot.start] Starting jscriptcoder.com...');
        
        cursorMode(TCursorMode.type);
        
        Bios.print(Config.loadingMsg, txtEl)
            .then(() => {
                console.log('[Promise#then] Starting the system...');
        
                cursorMode(TCursorMode.blink);
        
                setTimeout(() => require(Config.systemDeps), Config.delayBeforeLoading);
            });
        
    }
    
}

// Let's kick off the whole thing
Boot.start();