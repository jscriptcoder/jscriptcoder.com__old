/**
 * Shell prompt
 * @module apps/shell/prompt
 * @requires system/utils
 * @requires system/drivers/graphic/domwrap
 * @requires apps/shell/config
 * @requires apps/shell/history
 * @exports Prompt
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../../system/utils');
import DOMWrap = require('../../system/drivers/graphic/domwrap');
import Config = require('./config');
import History = require('./history');

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
     * @type Function
     * @private
     */
    __onEnter__;
    
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
     * @type History
     * @private
     */
    __history__;
    
    /**
     * @type Selection
     * @see Selection {@link https://developer.mozilla.org/en-US/docs/Web/API/Selection}
     * @private
     */
    __selection__;
    
    /**
     * @type Range
     * @see Range {@link https://developer.mozilla.org/en-US/docs/Web/API/Range}
     * @private
     */
    __range__;
    
    /**
     * Indicates whether or not we're in selection mode
     * @type Boolean
     * @private
     */
    __isSel__;
    
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
     * @param {System} sys
     * @param {Function} onEnter
     * @param {HTMLElement} kpEl
     * @constructor
     */
    constructor(el, sys, onEnter) {
        console.log('[Prompt#constructor] Setting up shell prompt...');
    
        super(el);

        this.__sys__ = sys;
        this.__onEnter__ = onEnter;
    
        this.__symbol__ = this.findOne(Config.symbolSel, true);
        this.__input__ = this.findOne(Config.inputSel, true);
        this.__cursor__ = this.findOne(Config.cursorSel, true);
    
        this.__history__ = this.__createHistory__();
        this.__selection__ = this.__getSelection__();
        this.__range__ = this.__createRange__();
    
        this.__isSel__ = false;
        this.__cmd__ = '';
        this.__curPos__ = 0; // zero-base
    
        this.__sys__.listen('keypress', this.onKeypress.bind(this));
    }

    /**
     * cmd getter
     * @readonly
     * @returns {String}
     * @public
     */
    get cmd() {
        return this.__cmd__;
    }

    /**
     * Instantiates a History object. Makes it easy to mock
     * @returns {History}
     * @private
     */
    __createHistory__() {
        return new History();
    }

    /**
     * Returns a Selection object
     * @returns {Selection}
     * @private
     */
    __getSelection__() {
        return Utils.getSelection();
    }

    /**
     * Creates a Range object
     * @returns {Range}
     * @private
     */
    __createRange__() {
        return Utils.createRange();
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
            tmp = Utils.createElement('div');
        
        this.__cmd__ = left + right;
        
        tmp.innerHTML = sys.encode(left);
        tmp.appendChild(this.__cursor__.el);
        tmp.innerHTML += sys.encode(right.substr(1));
        
        this.__input__.html(tmp.innerHTML);
        
    }

    /**
     * Removes the cursor from the input
     * @private
     */
    __removeCursor__() {
        this.__input__.html(this.__sys__.encode(this.__cmd__));
    }

    /**
     * Prepares for selection of a single character
     * @private
     */
    __charSelection__() {
        
        if (!this.__isSel__) {
            this.__isSel__ = true;
            
            this.__removeCursor__();
            this.__selection__.removeAllRanges();
            
            var cmdNode = this.__input__.first();

            this.__range__.setStart(cmdNode, this.__curPos__);
            this.__range__.setEnd(cmdNode, this.__curPos__);

            this.__selection__.addRange(this.__range__);
        }
        
    }

    /**
     * Returns the string representation of the prompt
     * @returns {String}
     * @public
     */
    toString() { return this.__el__.innerText || this.__el__.textContent }

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
     * Moves the cursor forward
     * @public
     */
    moveCursorForward() { this.moveCursorTo(this.__curPos__ + 1) }

    /**
     * Moves the cursor backward
     * @public
     */
    moveCursorBackward() { this.moveCursorTo(this.__curPos__ - 1) }

    /**
     * Moves the cursor to the beginning
     * @public
     */
    moveCursorHome() { this.moveCursorTo(0) }

    /**
     * Moves the cursor to the end
     * @public
     */
    moveCursorEnd() { this.moveCursorTo(this.__cmd__.length) }

    /**
     * Shows the previous command in the input
     * @public
     */
    showPreviousCmd() {
        this.__cmd__ = this.__history__.previous();
        this.moveCursorEnd();
    }

    /**
     * Shows the next command in the input
     * @public
     */
    showNextCmd() {
        this.__cmd__ = this.__history__.next();
        this.moveCursorEnd();
    }

    /**
     * Selects a range of characters to the left
     * @public
     */
    selectLeftRange() { while(this.selectLeftChar()); }

    /**
     * Selects a range of characters to the right
     * @public
     */
    selectRightRange() { while (this.selectRightChar()); }

    /**
     * Selects characters from the left on
     * @returns {Boolean} indicates the beginning of the cmd
     * @public
     */
    selectLeftChar() {
        if (this.__curPos__ > 0) {
            this.__charSelection__();
            this.__selection__.modify('extend', 'backward', 'character');
            this.__curPos__--;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Selects characters from the right on
     * @returns {Boolean} indicates the end of the cmd
     * @public
     */
    selectRightChar() {
        if (this.__curPos__ < this.__cmd__.length) {
            this.__charSelection__();
            this.__selection__.modify('extend', 'forward', 'character');
            this.__curPos__++;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears the command line
     * @public
     */
    clear() {
        console.log('[Prompt#clear] Clearing the input...');
        this.__cmd__ = '';
        this.moveCursorTo(0);
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
                        parts[0] = part.slice(0, -1); this.__curPos__--;
                        break;
                    case 'del':
                        
                        // deletes first char from the right part
                        if (part.length > 1) {
                            parts[1] = part[0] + part.substr(2);
                        } else {
                            parts[1] = ''; this.__cursor__.html('&nbsp;');
                        }
                        
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
        this.__onEnter__(this.__cmd__);
        this.__history__.add(this.__cmd__);
        this.clear();
    }

    /**
     * Sends HOME/END keys
     * @param {String} where (end|home)
     * @param {Boolean} shift
     * @public
     */
    jump(where, shift) {
        switch(where){
            case 'home':
                
                if (shift) { this.selectLeftRange() }
                else { this.moveCursorHome() }
                
                break;
            case 'end':
                
                if (shift) { this.selectRightRange() }
                else { this.moveCursorEnd() }
                
                break;
        }
    }

    /**
     * Sends arrows
     * @param {String} which [up|down|left|right]
     * @param {Boolean} shift
     * @public
     */
    arrow(which, shift) {
        switch(which){
                
            case 'up': this.showPreviousCmd(); break;
            case 'down': this.showNextCmd(); break;
                break;
                
            case 'left': 
                
                if (shift) { this.selectLeftChar() }
                else { this.moveCursorBackward() }
                
                break;
            case 'right': 
                
                if (shift) { this.selectRightChar() }
                else { this.moveCursorForward() }

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
     * Copies selected text to the clipboard
     * @public
     */
    copy() {}

    /**
     * Gets triggered on keypress
     * @param {String} type
     * @param {String} key
     * @param {Any} extra
     * @event
     */
    onKeypress(type, key, extra) {
        if (Utils.isFunction(this[type])) {
            this[type](key, extra);
        }
    }
}

export = Prompt;