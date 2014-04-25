/**
 * Terminal Prompt
 * @module apps/terminal/prompt
 * @requires system/drivers/graphic/domwrap
 * @requires apps/terminal/config
 * @exports Prompt
 */

import DOMWrap = require('../../system/drivers/graphic/domwrap');
import Config = require('./config');

/**
 * Prompt user interface
 * @class Prompt
 * @extends DOMWrap
 */
class Prompt extends DOMWrap {

    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * @type HTMLElement
     * @private
     */
    __symbol__;

    /**
     * @type HTMLElement
     * @private
     */
    __input__;

    /**
     * @type HTMLElement
     * @private
     */
    __cursor__;

    /**
     * @constructor
     * @param {HTMLElement} el
     * @param {System} sys
     * @param {HTMLElement} kpEl
     */
    constructor(el, sys) {
        console.log('[Prompt#constructor] Setting up terminal prompt...');
    
        super(el);

        this.__sys__ = sys;
        this.__symbol__ = this.findOne(Config.symbolSel);
        this.__input__ = this.findOne(Config.inputSel);
        this.__cursor__ = this.findOne(Config.cursorSel);

        sys.listen('keydown', this.onKeydown.bind(this));
    }

    /**
     * symbol getter
     * @readonly
     * @returns {HTMLElement}
     * @public
     */
    get symbol() {
        return this.__symbol__;
    }

    /**
     * input getter
     * @readonly
     * @returns {HTMLElement}
     * @public
     */
    get input() {
        return this.__input__;
    }

    /**
     * cursor getter
     * @readonly
     * @returns {HTMLElement}
     * @public
     */
    get cursor() {
        return this.__cursor__;
    }

    /**
     * Gets trigger on keydown
     * @event
     * @param {Event} e
     */
    onKeydown(e) {
        console.log(String.fromCharCode(e.which));
    }
}

export = Prompt;