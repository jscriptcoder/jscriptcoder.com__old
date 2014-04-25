/**
 * Terminal Output
 * @module apps/terminal/output
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
     * @constructor
     * @param {HTMLElement} el
     * @param {System} sys
     * @param {HTMLElement} kpEl
     */
    constructor(el, sys) {
        console.log('[Output#constructor] Setting up terminal output...');
    
        super(el);

        this.__sys__ = sys;
    
        sys.setOutput(this.el);
    }

    /**
     * Sends a message to the output
     * @param {String|String[]} message
     * @public
     */
    print(message) {
        this.__sys__.print(message);
    }

}

export = Output;