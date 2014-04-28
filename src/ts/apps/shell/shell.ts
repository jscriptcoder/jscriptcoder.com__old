/**
 * @module apps/shell/shell
 * @requires system/drivers/graphic/domwrap
 * @requires apps/shell/config
 * @requires apps/shell/output
 * @requires apps/shell/prompt
 * @exports Shell
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
    
        super(sys.createElement(Config.template));
    
        sys.appendElement(this.el);
    
        this.__sys__ = sys;
        this.__output__ = new Output(this.findOne(Config.outputSel), sys);
        this.__prompt__ = new Prompt(this.findOne(Config.promptSel), sys);
    
        this.__prompt__.onCommand = this.onCommand.bind(this);
    
        this.__output__.print(Config.msgHeader);
        
    }

    /**
     * Gets trigger when the user sends the js command by pressing enter
     * @param {String} cmd
     * @event
     */
    onCommand(cmd) {
        console.log('[Terminal#onCommand] Command:', cmd);
    }
    
}

export = Shell;