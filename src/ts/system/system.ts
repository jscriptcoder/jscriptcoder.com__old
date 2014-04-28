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
    
        this.__graphic__ = new Graphic(this);
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
     * Creates a new HTML element based on the tagName
     * @param {String} name
     * @public
     */
    createElement(name) {
        throw Error ('[System#createElement] must be implemented by the graphic driver');
    }

    /**
     * Encodes a string to be displayed properly
     * @param {String} str
     * @public
     */
    encode(str) {
        throw Error ('[System#encode] must be implemented by the graphic driver');
    }

    /**
     * Creates a new GUI
     * @param {String} gui
     * @param {Boolean} attach
     * @returns {HTMLElement}
     * @public
     */
    createGUI(gui, attach) {
        throw Error ('[System#createGUIElement] must be implemented by the graphic driver');
    }

    /**
     * Empties only the output
     * @public
     */
    clearOutput() {
        throw Error ('[System#clearOutput] must be implemented by the graphic driver');
    }

    /**
     * Clears the whole screen
     * @public
     */
    clearScreen() {
        throw Error ('[System#clearScreen] must be implemented by the graphic driver');
    }

    /**
     * Sets the output element for content display
     * @param {HTMLElement} el
     * @public
     */
    setOutput(el) {
        throw Error ('[System#setOutput] must be implemented by the graphic driver');
    }

    /**
     * Sends a string to the output
     * @param {String} msg
     * @public
     */
    output(msg) {
        throw Error ('[System#output] must be implemented by the graphic driver');
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