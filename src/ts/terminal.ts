/**
 * @module terminal
 * @exports Terminal
 * @requires wrapper
 */

import Wrapper = require('./wrapper');
import Prompt = require('./prompt');
import Output = require('./output');

/**
 * Terminal program
 * @class Terminal
 * @extends Wrapper
 */
class Terminal extends Wrapper {

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
     */
    constructor(el) {
        super(el);

        this.__prompt__ = this.newPrompt();
        this.__prompt__.removeClass('hide');
    
        this.__output__ = this.newOutput();
        this.__output__.removeClass('hide');
    }

    /**
     * Creates an instance of Prompt. Easy to mock
     * @type Prompt
     * @public
     */
    newPrompt() {
        return new Prompt(document.getElementById('prompt'), document);
    }

    /**
     * Creates an instance of Output. Easy to mock
     * @type Output
     * @public
     */
    newOutput() {
        return new Output(document.getElementById('output'));
    }

    /**
     * Internally uses Output#print method
     * @param {String} message
     * @public
     */
    print(message) {
        this.__output__.print(message);
    }

}

export = Terminal;