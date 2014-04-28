/**
 * @module system/system
 * @requires system/drivers/graphic/graphic
 * @exports System
 */

import Graphic = require('./drivers/graphic/graphic');

/**
 * Contains the System API
 * @class System
 */
class System {

    /**
     * document API
     * @type Document
     */
    static doc = document;
    
    /**
     * window API
     * @type Window
     */
    static global = window;
        
    /**
     * @type Graphic
     * @private
     */
    __graphic__;
    
    /**
     * Initializes the system, drivers, etc...
     * @param {HTMLElement} doc
     * @constructor
     */
    constructor() {
    
        console.log('[System#constructor] Initializing system and drivers...');
    
        this.__graphic__ = new Graphic(System.doc);
    }

    /**
     * global getter
     * @returns {Window}
     * @public
     */
    get global() {
        return System.global;
    }

    /**
     * doc getter
     * @returns {Document}
     * @public
     */
    get doc() {
        return System.doc;
    }

    /**
     * graphic getter
     * @returns {Graphic}
     * @public
     */
    get graphic() {
        return this.__graphic__;
    }

    /**
     * Empties only the output
     * @public
     */
    clearOutput() {
        this.__graphic__.empty();
    }

    /**
     * Clears the whole screen
     * @public
     */
    clearScreen() {
        this.__graphic__.empty(true);
    }

    /**
     * Sends a string to the output
     * @param {String} msg
     * @public
     */
    output(msg) {
        this.__graphic__.print(msg);
    }

    /**
     * Listens to events on a particular context
     * @param {String} evtName
     * @param {Function} handler
     * @param {HTMLElement} [context = System.doc]
     * @public
     */
    listen(evtName, handler, context = System.doc) {
        context.addEventListener(evtName, handler);
    }

}

export = System;