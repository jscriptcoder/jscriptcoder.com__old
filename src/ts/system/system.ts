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
     * Reference in order to use document API
     * @type HTMLElement
     * @static
     */
    static doc = document;
    
    /**
     * @type Graphic
     * @private
     */
    __graphic__;
    
    /**
     * Initializes the system, drivers, etc...
     * @constructor
     */
    constructor() {
    
        console.log('[System#constructor] Initializing system and drivers...');
    
        this.__graphic__ = new Graphic(); 
    }

    /**
     * Sets the output by default
     * @param {HTMLElement} output
     * @public
     */
    setOutput(output) {
        this.__graphic__.output = output;
    }

    /**
     * Creates DOM elements from html strings
     * @param {String} html
     * @returns {HTMLElement}
     * @public
     */
    createElement(html) {
        return this.__graphic__.createDOMElement(html);
    }

    /**
     * Appends an elements to the screen
     * @param {HTMLElement} el
     * @returns {HTMLElement}
     * @public
     */
    appendElement(el) {
        return this.__graphic__.appendDOMElement(el);
    }

    /**
     * Clears the screen
     * @public
     */
    clear() {
        this.__graphic__.empty();
    }

    /**
     * Prints a message
     * @param {String|String[]} message
     * @public
     */
    print(message) {
        this.__graphic__.print(message);
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