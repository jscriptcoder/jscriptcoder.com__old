/**
 * @module apps/shell/shell
 * @requires system/drivers/graphic/domwrap
 * @requires apps/shell/config
 * @requires apps/shell/output
 * @requires apps/shell/prompt
 * @exports Shell
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import DOMWrap = require('../../system/drivers/graphic/domwrap');
import Config = require('./config');
import Output = require('./output');
import Prompt = require('./prompt');

/**
 * Shell application for user interaction with the system
 * @class Terminal
 * @extends DOMWrap
 */
class Shell extends DOMWrap {
    
    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * @type Output
     * @private
     */
    __output__;
    
    /**
     * @type Prompt
     * @private
     */
    __prompt__;
    
    /**
     * Initializes an instance of Terminal`
     * @param {System} sys
     * @constructor
     */
    constructor(sys) {
    
        console.log('[Terminal#constructor] Initializing terminal app...');
    
        super(sys.createGUI(Config.template, true));
    
        this.__sys__ = sys;
        this.__output__ = this.__createOutput__(this.findOne(Config.outputSel));
        this.__prompt__ = this.__createPrompt__(this.findOne(Config.promptSel));
    
        this.__output__.print(Config.msgHeader);
        
    }

    /**
     * sys getter
     * @readonly
     * @returns {System}
     * @public
     */
    get sys() {
        return this.__sys__;
    }

    /**
     * output getter
     * @readonly
     * @returns {Output}
     * @public
     */
    get output() {
        return this.__output__;
    }

    /**
     * prompt getter
     * @readonly
     * @returns {Prompt}
     * @public
     */
    get prompt() {
        return this.__prompt__;
    }

    /**
     * Instantiates an Output object. Makes it easy to mock
     * @param {HTMLElement} el
     * @returns {Output}
     * @private
     */
    __createOutput__(el) {
        return new Output(el, this.__sys__);
    }

    /**
     * Instantiates a Prompt object. Makes it easy to mock
     * @param {HTMLElement} el
     * @returns {Prompt}
     * @private
     */
    __createPrompt__(el) {
        return new Prompt(el, this.__sys__, this.onCommand.bind(this));
    }

    /**
     * Gets trigger when the user sends the js command by pressing enter
     * @param {String} cmd
     * @param {Boolean} shift
     * @event
     */
    onCommand(cmd, shift) {
        console.log('[Shell#onCommand] command:', cmd);
        this.__output__.print(this.__prompt__.toString());
    }
    
}

export = Shell;