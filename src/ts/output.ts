/**
 * @module output
 * @exports Output
 * @requires wrapper
 * @requires utils
 */

import Wrapper = require('./wrapper');
import Utils = require('./utils');

/**
 * Takes care of the output
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
     * @param {String|String[]} message
     * @throws {Error} Wrong parameter
     * @public
     */
    print(message) {
        
        if (Utils.isArray(message)) { // there are more than one line
            
            message.forEach((line) => this.print(line));
            
        } else if (Utils.isString(message)) { // single line
            
            var div = this.create('div');
            div.innerHTML = message.replace(/^\s/, '&nbsp;');
            this.append(div);

        } else {
            
            throw Error('Wrong parameter: ' + message);
            
        }

    }

}

export = Output;