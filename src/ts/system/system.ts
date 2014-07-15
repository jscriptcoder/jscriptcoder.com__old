/**
 * @module system/system
 * @requires system/interrupts
 * @requires system/drivers/graphic/graphic
 * @requires system/drivers/keyboard/keyboard
 * @requires system/ring3
 * @requires system/utils
 * @exports System
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Interrups = require('./interrupts');
import Graphic = require('./drivers/graphic/graphic');
import Keyboard = require('./drivers/keyboard/keyboard');
import Ring3 = require('./ring3');
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
     * @type Ring
     * @private
     */
    __ring__;
    
    /**
     * Initializes the system, drivers, etc...
     * @param {HTMLElement} doc
     * @constructor
     */
    constructor() {
    
        console.info('[System#constructor] Initializing system and drivers...');
    
        super();
    
        this.__graphic__ = this.__createGraphicDriver__();
        this.__keyboard__ = this.__createKeyboardDriver__();
    	this.__ring__ = this.__createRing__();
    
    	this.__listen__();
    
    }

    /**
     * Installs necessary interruption-listeners
     * @private
     */
	__listen__() {
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
     * Instantiates the first ring level
     * @returns {Ring}
     * @private
     */
    __createRing__() { return new Ring3(this) }

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

}

export = System;