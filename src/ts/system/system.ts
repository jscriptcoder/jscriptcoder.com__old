/**
 * @module system/system
 * @requires system/interrupts
 * @requires system/drivers/graphic/graphic
 * @requires system/drivers/keyboard/keyboard
 * @requires system/utils
 * @exports System
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Interrups = require('./interrupts');
import Graphic = require('./drivers/graphic/graphic');
import Keyboard = require('./drivers/keyboard/keyboard');
import Utils = require('./utils');

/**
 * Contains the System API and acts as a mediator between drivers and apps
 * @class System
 * @extends Interrupts
 */
class System extends Interrups {
        
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
    
        this.__graphic__ = this.__createGraphicDriver__();
        this.__keyboard__ = this.__createKeyboardDriver__();
    
        this.listen('click', this.__onDocumentClick__.bind(this), Utils.doc);
    }

    /**
     * Instantiates a Graphic driver. Makes it easy to mock
     * @returns {Graphic}
     * @private
     */
    __createGraphicDriver__() { return new Graphic(this) }

    /**
     * Instantiates a Keyboard driver. Makes it easy to mock
     * @returns {Keyboard}
     * @private
     */
    __createKeyboardDriver__() { return new Keyboard(this) }

    /**
     * Gets triggered when the user clicks on the document
     * @param {Event} e
     * @event
     */
    __onDocumentClick__(e) { this.interrupt('documentclick', e) }

    /**
     * graphic getter
     * @returns {Graphic}
     * @public
     */
    get graphic() { return this.__graphic__ }

    /**
     * keyboard getter
     * @returns {Keyboard}
     * @public
     */
    get keyboard() { return this.__keyboard__ }

    /**
     * Encodes a string to be displayed properly
     * @param {String} str
     * @throws {Error} Implemented by the graphic card
     * @public
     */
    encode(str) { throw Error('Implemented by the graphic card') }

    /**
     * Creates a new GUI
     * @param {String} gui
     * @param {Boolean} attach
     * @returns {HTMLElement}
     * @throws {Error} Implemented by the graphic card
     * @public
     */
    createGUI(gui, attach) { throw Error('Implemented by the graphic card') }

    /**
     * Empties only the output
     * @throws {Error} Implemented by the graphic card
     * @public
     */
    clearOutput() { throw Error('Implemented by the graphic card') }

    /**
     * Clears the whole screen
     * @throws {Error} Implemented by the graphic card
     * @public
     */
    clearScreen() { throw Error('Implemented by the graphic card') }

    /**
     * Sets the output element for content display
     * @param {HTMLElement} el
     * @throws {Error} Implemented by the graphic card
     * @public
     */
    setOutput(el) { throw Error('Implemented by the graphic card') }

    /**
     * Sends a string to the output
     * @param {String} msg
     * @throws {Error} Implemented by the graphic card
     * @public
     */
    output(msg) { throw Error('Implemented by the graphic card') }

}

export = System;