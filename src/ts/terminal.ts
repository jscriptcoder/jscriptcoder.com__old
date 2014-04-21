/**
 * @module terminal
 * @exports Terminal
 * @requires elementWrapper
 */

import ElementWrapper = require('./elementWrapper');

/**
 * @class Terminal
 * @extends ElementWrapper
 */
class Terminal extends ElementWrapper {

    /**
     * @type Prompt
     * @private
     */
    __prompt__;

    /**
     * @type Output
     * @private
     */
    __output__;

    /**
     * @constructor
     * @param {String|HTMLElement} el
     * @param {Prompt} prompt
     * @param {Output} output
     */
    constructor(el, prompt, output) {
        super(el);

        this.__prompt__ = prompt;
        this.__output__ = output;

        this.__output__.removeClass('hide');
        this.__prompt__.removeClass('hide');
    }

    print(msg) {
        this.__output__.print(msg);
    }

}

export = Terminal;