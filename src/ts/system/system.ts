/**
 * @module system/system
 * @requires system/interrupts
 * @requires system/drivers/graphic/graphic
 * @requires system/drivers/keyboard/keyboard
 * @exports System
 */

import Interrups = require('./interrupts');
import Graphic = require('./drivers/graphic/graphic');
import Keyboard = require('./drivers/keyboard/keyboard');

/**
 * Contains the System API and acts as a mediator between drivers and apps
 * @class System
 * @extends Interrupts
 */
class System extends Interrups {

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
     * @type Keyboard
     * @private
     */
    __keyboard__;
    
    /**
     * Initializes the system, drivers, etc...
     * @param {HTMLElement} doc
     * @constructor
     */
    constructor() {
    
        console.log('[System#constructor] Initializing system and drivers...');
    
        super();
    
        this.__graphic__ = new Graphic(this);
        this.__keyboard__ = new Keyboard(this);
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
     * keyboard getter
     * @returns {Keyboard}
     * @public
     */
    get keyboard() {
        return this.__keyboard__;
    }

    /**
     * Wrapper for document.createElement method
     * @param {String} tagName
     * @return {HTMLElement}
     * @public
     */
    createElement(tagName) {
        return System.doc.createElement(tagName);
    }

    /**
     * Wrapper for document.getElementById method
     * @param {String} id
     * @return {HTMLElement}
     * @public
     */
    getElementById(id) {
        return System.doc.getElementById(id);
    }

    /**
     * Encodes a string to be displayed properly
     * @param {String} str
     * @public
     */
    encode(str) {
        return this.__graphic__.htmlEncode(str);
    }

    /**
     * Creates a new GUI
     * @param {String} gui
     * @param {Boolean} attach
     * @returns {HTMLElement}
     * @public
     */
    createGUI(gui, attach) {
        return attach ? this.__graphic__.appendHtmlElement(gui) : this.__graphic__.createElementByHtml(gui);
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
     * Sets the output element for content display
     * @param {HTMLElement} el
     * @public
     */
    setOutput(el) {
        this.__graphic__.output = el;
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
     * Installs keypress listeners on an element
     * @param {HTMLElement} [el = this.doc]
     * @public
     */
    installKeypressInterrupts(el = this.doc) {
        var keyboard = this.__keyboard__;
        
        this.listen('keypress', keyboard.onKeypress.bind(keyboard), el);
        this.listen('keydown', keyboard.onKeydown.bind(keyboard), el);
    }

}

export = System;