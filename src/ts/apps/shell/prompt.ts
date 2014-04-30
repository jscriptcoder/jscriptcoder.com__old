/**
 * Shell prompt
 * @module apps/shell/prompt
 * @requires system/utils
 * @requires system/drivers/graphic/domwrap
 * @requires apps/shell/config
 * @exports Prompt
 */

import Utils = require('../../system/utils');
import DOMWrap = require('../../system/drivers/graphic/domwrap');
import Config = require('./config');

/**
 * Prompt user interface
 * @class Prompt
 * @extends DOMWrap
 */
class Prompt extends DOMWrap {

    /**
     * @type Shell
     * @private
     */
    __shell__;
    
    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * @type DOMWrap
     * @private
     */
    __symbol__;

    /**
     * @type DOMWrap
     * @private
     */
    __input__;

    /**
     * @type DOMWrap
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
     * Initializes an instance of Prompt
     * @param {HTMLElement} el
     * @param {Shell} shell
     * @param {HTMLElement} kpEl
     * @constructor
     */
    constructor(el, shell) {
        console.log('[Prompt#constructor] Setting up shell prompt...');
    
        super(el);

        this.__shell__ = shell;
        this.__sys__ = shell.sys;
    
        this.__symbol__ = this.findOne(Config.symbolSel, true);
        this.__input__ = this.findOne(Config.inputSel, true);
        this.__cursor__ = this.findOne(Config.cursorSel, true);
        
        this.__cmd__ = '';
        this.__curPos__ = 0; // zero-base
    
        this.__startListening__();
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
     * Starts listening to key events
     * @private
     */
    __startListening__() {
        var sys = this.__sys__;
        
        sys.listen('keypress', this.onKeypress.bind(this));
        sys.installKeypressInterrupts();
        
    }

    /**
     * Gets back the left and right (to the cursor) parts of the command
     * @returns {String[]}
     * @private
     */
    __getCmdParts__() {
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
            right = parts[1],
            sys = this.__sys__,
            tmp = sys.createElement('div');
        
        this.__cmd__ = left + right;
        
        tmp.innerHTML = sys.encode(left);
        tmp.appendChild(this.__cursor__.el);
        tmp.innerHTML += sys.encode(right.substr(1));
        
        this.__input__.html(tmp.innerHTML);
        
    }

    

    /**
     * Inserts a new character in the input
     * @param {String} char
     * @public
     */
    insert(char) {
        var parts = this.__getCmdParts__();
        
        // adds a char to the left part
        parts[0] += char;
        this.__curPos__++;
        
        this.__joinCmdAndInsert__(parts);
    }

    /**
     * Moves the cursor to a different position
     * @param {Number} pos
     * @public
     */
    moveCursorTo(pos) {
        
        this.__curPos__ = pos < 0 ? 0 : (pos > this.__cmd__.length ? this.__cmd__.length : pos);
        
        var parts = this.__getCmdParts__(),
            curChar = parts[1].charAt(0);
        
        this.__cursor__.html(curChar ? this.__sys__.encode(curChar) : '&nbsp;');
        
        this.__joinCmdAndInsert__(parts);
        
    }

    /**
     * Sends BACKSPACE/DEL to the input
     * @param {String} type [backspace|del]
     * @public
     */
    delete(key) {
        if (this.__cmd__ !== '') {
            var parts = this.__getCmdParts__(), 
                part = key === 'backspace' ? parts[0] : parts[1];
            
            if (part !== '') { // do nothing if there is nothing to delete

                switch(key) {
                    case 'backspace':
                        // deletes last char from the left part
                        parts[0] = part.slice(0, -1);
                        this.__curPos__--;
                        break;
                    case 'del':
                        // deletes first char from the right part
                        parts[1] = part[0] + part.substr(2);
                        break;
                }
                
                this.__joinCmdAndInsert__(parts);
                
            }

        }
    }

    /**
     * Sends a tab
     * @public
     */
    tab() { this.insert('\t') }

    /**
     * Sends enter
     * @public
     */
    enter() {
        
        //this.onCommand(this.__cmd__);
    }

    /**
     * Sends HOME/END keys
     * @param {String} where (end|home);
     * @public
     */
    jump(where) {
        this.moveCursorTo({
            'end': this.__cmd__.length,
            'home': 0
        }[where]);
    }

    /**
     * Sends arrows
     * @param {String} which [up|down|left|right]
     * @public
     */
    arrow(which) {
        switch(which){
                
            case 'up':
            case 'down':
                //TODO: history
                break;
                
            case 'left':
            case 'right':
                this.moveCursorTo({
                    'left': this.__curPos__ - 1,
                    'right': this.__curPos__ + 1
                }[which]);
                break;
                
        }
    }

    /**
     * Sends a character
     * @param {String} c
     * @public
     */
    char(c) { this.insert(c) }

    /**
     * Gets triggered on keypress
     * @param {String} type
     * @param {String} key
     * @event
     */
    onKeypress(type, key) {
        if (Utils.isFunction(this[type])) {
            this[type](key);
        }
    }
}

export = Prompt;