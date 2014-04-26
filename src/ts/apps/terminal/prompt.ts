/**
 * Terminal prompt
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
     * Command line introduced
     * @type String
     * @private
     */
    __cmd__;

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

        this.__cmd__ = '';
        this.__input__.innerHTML = '';
    
        sys.listen('keypress', this.onKeypress.bind(this));
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
     * command getter
     * @readonly
     * @returns {String}
     * @public
     */
    get cmd() {
        return this.__cmd__;
    }

    /**
     * Encodes the parameter to show it properly in the input
     * @param {String} str
     * @returns {String}
     * @public
     */
    encode(str) {
        return str
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/ /g, '&nbsp;');
    }

    /**
     * Sets the content of the input, current command by default
     * @param {String} [str = this.cmd]
     * @public
     */
    setInput(str = this.cmd) {
        this.__input__.innerHTML = this.encode(str);
    }

    /**
     * Inserts a character in the input
     * @param {String} char
     * @public
     */
    insert(char) {
        this.__cmd__ += char;
        this.setInput();
    }

    /**
     * Applies backspace on the input
     * @public
     */
    backspace() {
        if (this.__cmd__ !== '') {
            this.__cmd__ = this.__cmd__.slice(0, -1);
            this.setInput();
        }
    }

    /**
     * Applies enter on the input
     * @public
     */
    enter() {
        
    }

    /**
     * Gets trigger on keypress
     * @event
     * @param {Event} e
     */
    onKeypress(e) {
        e.preventDefault();
        
        if (!e.ctrlKey && !e.altKey) {
            this.insert(String.fromCharCode(e.which));
            console.log('keypress', e);
        }

    }

    /**
     * Gets trigger on keydown. Filters out special keys
     * @event
     * @param {Event} e
     */
    onKeydown(e) {
        
        switch(e.which) {
            case 8: // BACKSPACE
                e.preventDefault();
                console.log('BACKSPACE');
                
                this.backspace();
                
                break;
            case 9: // TAB
                e.preventDefault();
                console.log('TAB');
                
                this.insert('\t');
                
                break;
            case 13: // ENTER
                e.preventDefault();
                console.log('ENTER');
                
                this.enter();
                
                break;
            case 38: // UP
            case 40: // DOWN
                e.preventDefault();
                console.log('UP/DOWN');
                break;
            case 37: // LEFT
            case 39: // RIGHT
                e.preventDefault();
                console.log('LEFT/RIGHT')
                break;
            case 36: // HOME
            case 35: // END
                e.preventDefault();
                console.log('HOME/END');
                break;
            case 67: // C
            case 86: // V
                if (e.ctrlKey) {
                    e.preventDefault();
                    console.log('COPY/PASTE');
                }
                break;
            default:
                console.log(e);
            
        }
        
    }

    /**
     * Processes the command after hitting enter. Implemented by Terminal
     * @abstract
     * @param {String} cmd
     * @public
     */
    processCommand(cmd) {}
}

export = Prompt;