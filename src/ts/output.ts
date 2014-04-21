/**
 * @module output
 * @exports Output
 * @requires wrapper
 * @requires utils
 */

import Wrapper = require('./wrapper');
import Utils = require('./utils');

/**
 * @class Output
 * @extends Wrapper
 */
class Output extends Wrapper {

    /**
     * @constructor
     * @param {String|HTMLElement} el
     */
    constructor(el) {
        super(el);
    }

    /**
     * Prints a message wrapping it in a div
     * @param {String|String[]} msg
     * @throws {Error} Wrong parameter
     * @public
     */
    print(msg) {
        var div = document.createElement('div');

        if (Utils.isArray(msg)) {
            msg.forEach((val) => this.print(val));
        } else if (Utils.isString) {
            div.innerHTML = msg.replace(/^\s/, '&nbsp;');
        } else {
            throw Error('Wrong parameter: ' + msg);
        }

        this.append(div);
    }

}

export = Output;