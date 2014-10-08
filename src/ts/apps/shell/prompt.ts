/**
 * Shell prompt
 * @module apps/shell/prompt
 * @requires system/utils/utils
 * @requires system/drivers/graphic/domwrap
 * @requires apps/shell/config
 * @requires apps/shell/history
 * @exports Prompt
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../../system/utils/utils');
import DOMWrap = require('../../system/drivers/graphic/domwrap');
import Config = require('./config');
import History = require('./history');
import Program = require('./program');

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
     * @type Program
     * @private
     */
    __program__;
    
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
        this.__program__ = this.__createProgram__();
        this.__selection__ = this.__getSelection__();
        this.__range__ = this.__createRange__();
        
        this.__isSel__ = false;
        this.__cmd__ = '';
        this.__curPos__ = 0; // zero-base
    
    	this.__listen__(sys);

    }

    /**
     * cmd getter
     * @readonly
     * @returns {String}
     * @public
     */
    get cmd() { return this.__cmd__ }

    /**
     * Installs necessary interruption-listeners
     * @param {System} sys
     * @private
     */
	__listen__(sys) {
        sys.listen('keypress', this.onKeypress.bind(this));
        sys.listen('documentclick', this.onDocumentClick.bind(this));
        sys.listen('outputdone', this.onOutputDone.bind(this));
        
    }

    /**
     * Instantiates a History object. Makes it easy to mock
     * @returns {History}
     * @private
     */
    __createHistory__() { return new History() }

    /**
     * Instantiates a Program object
     * @returns {Program}
     * @private
     */
    __createProgram__() { return new Program() }

    /**
     * Returns a Selection object
     * @returns {Selection}
     * @private
     */
    __getSelection__() { return Utils.getSelection() }

    /**
     * Creates a Range object
     * @returns {Range}
     * @private
     */
    __createRange__() { return Utils.createRange() }

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
            graphic = this.__sys__.graphic,
            tmp = Utils.createElement('div');
        
        this.__cmd__ = left + right;
        
        tmp.innerHTML = graphic.htmlEncode(left);
        tmp.appendChild(this.__cursor__.el);
        tmp.innerHTML += graphic.htmlEncode(right.substr(1));
        
        this.__input__.html(tmp.innerHTML);
        
    }

    /**
     * Removes the cursor from the input
     * @private
     */
    __removeCursor__() {
        this.__input__.html(this.__sys__.graphic.htmlEncode(this.__cmd__));
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
     * Deletes selected text
     * @private
     */
    __deleteSelection__() {
        var range = this.__selection__.getRangeAt(0), 
            cmd = this.__cmd__,
            selected = cmd.slice(range.startOffset, range.endOffset);
        
        // deletes the selected text from the command
        this.__cmd__ = cmd.replace(selected, '');
        
        // by setting the cursor position to the beginning of the selection
        // we put everything back together including cursor in the right position
        this.moveCursorTo(range.startOffset);
        
    }

    /**
     * Deletes selected character
     * @param {String} key [backspace|del]
     * @private
     */
    __deleteCharacter__(key) {
        
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
        
        // if there is selection, delete first
        if (this.__isSel__) this.__deleteSelection__();
        
        var parts = this.__getCmdParts__();
        
        // adds a char to the left part
        parts[0] += char;
        this.__curPos__ += char.length;
        
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
        
        this.__cursor__.html(curChar ? this.__sys__.graphic.htmlEncode(curChar) : '&nbsp;');
        
        this.__joinCmdAndInsert__(parts);
        
        // let's always end selection time here
        this.__isSel__ = false;
        
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
        this.__cmd__ = this.__program__.strTabs + this.__history__.previous();
        this.moveCursorEnd();
    }

    /**
     * Shows the next command in the input
     * @public
     */
    showNextCmd() {
        this.__cmd__ = this.__program__.strTabs + this.__history__.next();
        this.moveCursorEnd();
    }

    /**
     * Selects a range of characters to the left
     * @public
     */
    selectLeftRange() {
        while(this.selectLeftChar());
        console.log('[Prompt#selectLeftRange] Range selected: "' + this.__selection__ + '"');
    }

    /**
     * Selects a range of characters to the right
     * @public
     */
    selectRightRange() {
        while (this.selectRightChar());
        console.log('[Prompt#selectRightRange] Range selected: "' + this.__selection__ + '"');
    }

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

    isCmdEmpty() { return !!this.__cmd__.match(/^\s*$/); }
    
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
            
            if (this.__isSel__) { this.__deleteSelection__() }
            else { this.__deleteCharacter__(key) }

        }
    }

    /**
     * Sends a tab
     * @param {Number} [n = 1]
     * @public
     */
    tab(n = 1) { while(n--) this.insert(Config.tab) }

    /**
     * Sends enter
     * @param {Boolean} shift
     * @public
     */
    enter(shift) {
        var cmd = this.__cmd__.replace(Utils.INIT_SPACES_RE, ''), 
            prog = this.__program__, 
            endProg;

        // being in a block (having at least one '{') 
        // or opening one, is the same as shift+enter
        shift = shift || !!cmd.match(Program.BEGIN_BLK_RE) || prog.isBlock;
        
        // now, if we're closing a block while being in 
        // the last one then it's like just pressing enter
        shift = shift && !(prog.isLastBlock && !!cmd.match(Program.END_BLK_RE));
        
        // ends the program if shift wasn't pressed
        if (!shift && prog.is) {
            prog.addLine(cmd); // add the last cmd
            cmd = prog.get();
            prog.clear();
            endProg = true;
        }
        
        this.__onEnter__(cmd, shift);
        this.__history__.add(cmd);
        
        this.clear();
        
        if (shift) {
            
            prog.addLine(cmd);
            
            // hides the symbol at the beginning of a program
            if (prog.numLines === 1) this.__symbol__.html('&nbsp;&nbsp;&nbsp;&nbsp;');

            // sends as many tabs as there are in the previous line
            if (prog.numTabs) this.tab(prog.numTabs);
            
        } else {
            
            // hides the prompt while the command is running
            // for asynchronous operations
            // this.hide();
            
        }
        
        // returns the symbol at the end of the program
        (endProg && this.__symbol__.html(Config.symbol));
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
    char(c) {
        var prog = this.__program__;
        
        if (prog.isBlock && this.isCmdEmpty() && c === '}') {
            
            // we're in a block and closing in with a single '}'
            // Let's move the cursor one tab back
            this.clear();
            this.tab(prog.numTabs - 1);
            
        }
            
        
        this.insert(c);
    }

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

    /**
     * Gets triggered on document click
     * @event
     */
    onDocumentClick() { this.moveCursorTo(this.__curPos__) }
    
    /**
     * Gets triggered when the output is done printing
     * @event
     */
    onOutputDone() {
        this.show();
        this.el.scrollIntoView();
    }
}

export = Prompt;