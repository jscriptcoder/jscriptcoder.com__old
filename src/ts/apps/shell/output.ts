/**
 * Shell Output
 * @module apps/shell/output
 * @requires system/drivers/graphic/domwrap
 * @exports Output
 */

import DOMWrap = require('../../system/drivers/graphic/domwrap');

/**
 * Outputs the result of commands
 * @class Output
 * @extends DOMWrap
 */
class Output extends DOMWrap {

    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * Initializes an instance of Output
     * @param {HTMLElement} el
     * @param {Terminal} termin
     * @param {HTMLElement} kpEl
     * @constructor
     */
    constructor(el, sys) {
        console.log('[Output#constructor] Setting up shell output...');
    
        super(el);

        this.__sys__ = sys;
    
        this.__sys__.setOutput(this.el);
    }

    /**
     * Sends a message to the output
     * @param {String|String[]} message
     * @public
     */
    print(message) {
        this.__sys__.output(message);
    }

}

export = Output;