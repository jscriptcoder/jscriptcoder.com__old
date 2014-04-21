/**
 * @module prompt
 * @exports Prompt
 * @requires elementWrapper
 */

import ElementWrapper = require('./elementWrapper');

/**
 * @class Prompt
 * @extends ElementWrapper
 */
class Prompt extends ElementWrapper {

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
     * @param {String|HTMLElement} el
     * @param {String|HTMLElement} kpEl
     */
    constructor(el, kpEl) {
        super(el);

        this.__symbol__ = this.__el__.querySelector('.symbol');
        this.__input__ = this.__el__.querySelector('.input');
        this.__cursor__ = this.__el__.querySelector('.cursor');

        kpEl.addEventListener('keydown', this.onKeydown.bind(this));
        kpEl.addEventListener('keypress', this.onKeypress.bind(this));
        kpEl.addEventListener('keyup', this.onKeyup.bind(this));
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
     * Gets trigger when the user types in the kpEl passed in the constructor
     * @event
     * @param {Event} e
     */
    onKeydown(e) {}

    /**
     * Gets trigger when the user types in the kpEl passed in the constructor
     * @event
     * @param {Event} e
     */
    onKeypress(e) {}

    /**
     * Gets trigger when the user types in the kpEl passed in the constructor
     * @event
     * @param {Event} e
     */
    onKeyup(e) {}
}

export = Prompt;