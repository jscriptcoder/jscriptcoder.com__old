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
     * Keeps track of the cursor position
     * @type Number
     * @private
     */
    __curPos__;

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
        this.__curPos__ = 0; // zero-base
    
        sys.listen('keypress', this.onKeypress.bind(this));
        sys.listen('keydown', this.onKeydown.bind(this));
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
     * Encodes the parameter to show it properly in the html input
     * @param {String} str
     * @returns {String}
     * @private
     */
    __encode__(str) {
        return str
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/ /g, '&nbsp;');
    }

    /**
     * Splits the command into two, left and right to the cursor
     * @returns {String[]}
     * @private
     */
    __splitCmd__() {
        return [
            this.__cmd__.substring(0, this.__curPos__), 
            this.__cmd__.substr(this.__curPos__)
        ];
    }

    /**
     * Joins the left and right parts to form the new command, adding the cursor in between
     * @param {String[]} parts
     * @private
     */
    __joinCmdAndInsert__(parts) {
        var left = parts[0],
            right = parts[1];
        
        this.__cmd__ = left + right;
        
        this.__input__.innerHTML = this.__encode__(left);
        this.__input__.appendChild(this.__cursor__);
        this.__input__.innerHTML += this.__encode__(right.substr(1));
    }

    

    /**
     * Inserts a new character in the input
     * @param {String} char
     * @public
     */
    insert(char) {
        var parts = this.__splitCmd__();
        
        // adds a char to the left part
        parts[0] += char;
        this.__curPos__++;
        
        this.__joinCmdAndInsert__(parts);
    }

    /**
     * Applies backspace on the input
     * @public
     */
    backspace() {
        if (this.__cmd__ !== '') {
            var parts = this.__splitCmd__();

            // deletes last char from the left part
            parts[0] = parts[0].slice(0, -1);
            this.__curPos__--;

            this.__joinCmdAndInsert__(parts);
        }
    }

    /**
     * Moves the cursor to a different position
     * @param {Number} pos
     * @public
     */
    moveCursorTo(pos) {
        
        this.__curPos__ = pos < 0 ? 0 : (pos > this.__cmd__.length ? this.__cmd__.length : pos);
        
        var parts = this.__splitCmd__(),
            curChar = parts[1].charAt(0);
        
        this.__cursor__.innerHTML = curChar ? this.__encode__(curChar) : '&nbsp;';
        
        this.__joinCmdAndInsert__(parts);
        
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
                
                // TODO
                
                break;
            case 38: // UP
            case 40: // DOWN
                e.preventDefault();
                
                console.log('UP/DOWN - History');
                
                // TODO
                
                break;
            case 36: // HOME
            case 35: // END
            case 37: // LEFT
            case 39: // RIGHT
                e.preventDefault();
                
                console.log('HOME/END/LEFT/RIGHT - Cursor position');
                
                var CurPos = {
                    36: 0,
                    35: this.__cmd__.length,
                    37: this.__curPos__ - 1,
                    39: this.__curPos__ + 1
                };
                
                this.moveCursorTo(CurPos[e.which]);
                
                break;
            case 67: // C
            case 86: // V
                if (e.ctrlKey) {
                    e.preventDefault();
                    
                    console.log('COPY/PASTE');
                    
                    // TODO
                }
                
                break;
            
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