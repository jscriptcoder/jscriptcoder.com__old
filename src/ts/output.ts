/**
 * @module output
 * @exports Output
 * @requires elementWrapper
 */

import ElementWrapper = require('./elementWrapper');

/**
 * @class Output
 * @extends ElementWrapper
 */
class Output extends ElementWrapper {

    /**
     * @constructor
     * @param {String|HTMLElement} el
     */
    constructor(el) {
        super(el);
    }

    /**
     * Prints a message wrapping it in a div
     * @param {String} msg
     * @public
     */
    print(msg) {
        var div = document.createElement('div');
        div.innerText = msg;
        this.append(div);
    }

}

export = Output;