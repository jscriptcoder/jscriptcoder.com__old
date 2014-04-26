/**
 * @module apps/terminal/terminal
 * @requires system/drivers/graphic/domwrap
 * @requires apps/terminal/config
 * @requires apps/terminal/output
 * @requires apps/terminal/prompt
 * @exports Terminal
 */

import DOMWrap = require('../../system/drivers/graphic/domwrap');
import Config = require('./config');
import Output = require('./output');
import Prompt = require('./prompt');

/**
 * Terminal application for user interaction with the system
 * @class Terminal
 * @extends DOMWrap
 */
class Terminal extends DOMWrap {
    
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
     * @constructor
     * @param {System} sys
     */
    constructor(sys) {
    
        console.log('[Terminal#constructor] Initializing terminal app...');
    
        super(sys.createElement(Config.template));
    
        sys.appendElement(this.el);
    
        this.__sys__ = sys;
        this.__output__ = new Output(this.findOne(Config.outputSel), sys);
        this.__prompt__ = new Prompt(this.findOne(Config.promptSel), sys);
    
        this.__prompt__.processCommand = this.processCommand.bind(this);
        this.__output__.print(Config.msgHeader);
        
    }

    /**
     * Processes the command after hitting enter
     * @param {String} cmd
     * @public
     */
    processCommand(cmd) {
        console.log('[Terminal#processCommand] Processing', cmd);
    }
    
}

export = Terminal;