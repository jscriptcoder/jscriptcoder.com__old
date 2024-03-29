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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/utils/utils', '../../system/drivers/graphic/domwrap', './config', './history', './program'], function(require, exports, Utils, DOMWrap, Config, History, Program) {
    /**
    * Prompt user interface
    * @class Prompt
    * @extends DOMWrap
    */
    var Prompt = (function (_super) {
        __extends(Prompt, _super);
        /**
        * Initializes an instance of Prompt
        * @param {HTMLElement} el
        * @param {System} sys
        * @param {Function} onEnter
        * @param {HTMLElement} kpEl
        * @constructor
        */
        function Prompt(el, sys, onEnter) {
            console.log('[Prompt#constructor] Setting up shell prompt...');

            _super.call(this, el);

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
        Object.defineProperty(Prompt.prototype, "cmd", {
            /**
            * cmd getter
            * @readonly
            * @returns {String}
            * @public
            */
            get: function () {
                return this.__cmd__;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Installs necessary interruption-listeners
        * @param {System} sys
        * @private
        */
        Prompt.prototype.__listen__ = function (sys) {
            sys.listen('keypress', this.onKeypress.bind(this));
            sys.listen('documentclick', this.onDocumentClick.bind(this));
            sys.listen('outputdone', this.onOutputDone.bind(this));
        };

        /**
        * Instantiates a History object. Makes it easy to mock
        * @returns {History}
        * @private
        */
        Prompt.prototype.__createHistory__ = function () {
            return new History();
        };

        /**
        * Instantiates a Program object
        * @returns {Program}
        * @private
        */
        Prompt.prototype.__createProgram__ = function () {
            return new Program();
        };

        /**
        * Returns a Selection object
        * @returns {Selection}
        * @private
        */
        Prompt.prototype.__getSelection__ = function () {
            return Utils.getSelection();
        };

        /**
        * Creates a Range object
        * @returns {Range}
        * @private
        */
        Prompt.prototype.__createRange__ = function () {
            return Utils.createRange();
        };

        /**
        * Gets back the left and right (to the cursor) parts of the command
        * @returns {String[]}
        * @private
        */
        Prompt.prototype.__getCmdParts__ = function () {
            return [
                this.__cmd__.substring(0, this.__curPos__),
                this.__cmd__.substr(this.__curPos__)
            ];
        };

        /**
        * Joins the left and right parts to form the new command, adding the cursor in between
        * @param {String[]} parts
        * @private
        */
        Prompt.prototype.__joinCmdAndInsert__ = function (parts) {
            var left = parts[0], right = parts[1], graphic = this.__sys__.graphic, tmp = Utils.createElement('div');

            this.__cmd__ = left + right;

            tmp.innerHTML = graphic.htmlEncode(left);
            tmp.appendChild(this.__cursor__.el);
            tmp.innerHTML += graphic.htmlEncode(right.substr(1));

            this.__input__.html(tmp.innerHTML);
        };

        /**
        * Removes the cursor from the input
        * @private
        */
        Prompt.prototype.__removeCursor__ = function () {
            this.__input__.html(this.__sys__.graphic.htmlEncode(this.__cmd__));
        };

        /**
        * Prepares for selection of a single character
        * @private
        */
        Prompt.prototype.__charSelection__ = function () {
            if (!this.__isSel__) {
                this.__isSel__ = true;

                this.__removeCursor__();
                this.__selection__.removeAllRanges();

                var cmdNode = this.__input__.first();

                this.__range__.setStart(cmdNode, this.__curPos__);
                this.__range__.setEnd(cmdNode, this.__curPos__);

                this.__selection__.addRange(this.__range__);
            }
        };

        /**
        * Deletes selected text
        * @private
        */
        Prompt.prototype.__deleteSelection__ = function () {
            var range = this.__selection__.getRangeAt(0), cmd = this.__cmd__, selected = cmd.slice(range.startOffset, range.endOffset);

            // deletes the selected text from the command
            this.__cmd__ = cmd.replace(selected, '');

            // by setting the cursor position to the beginning of the selection
            // we put everything back together including cursor in the right position
            this.moveCursorTo(range.startOffset);
        };

        /**
        * Deletes selected character
        * @param {String} key [backspace|del]
        * @private
        */
        Prompt.prototype.__deleteCharacter__ = function (key) {
            var parts = this.__getCmdParts__(), part = key === 'backspace' ? parts[0] : parts[1];

            if (part !== '') {
                switch (key) {
                    case 'backspace':
                        // deletes last char from the left part
                        parts[0] = part.slice(0, -1);
                        this.__curPos__--;
                        break;
                    case 'del':
                        // deletes first char from the right part
                        if (part.length > 1) {
                            parts[1] = part[0] + part.substr(2);
                        } else {
                            parts[1] = '';
                            this.__cursor__.html('&nbsp;');
                        }

                        break;
                }

                this.__joinCmdAndInsert__(parts);
            }
        };

        /**
        * Returns the string representation of the prompt
        * @returns {String}
        * @public
        */
        Prompt.prototype.toString = function () {
            return this.__el__.innerText || this.__el__.textContent;
        };

        /**
        * Inserts a new character in the input
        * @param {String} char
        * @public
        */
        Prompt.prototype.insert = function (char) {
            // if there is selection, delete first
            if (this.__isSel__)
                this.__deleteSelection__();

            var parts = this.__getCmdParts__();

            // adds a char to the left part
            parts[0] += char;
            this.__curPos__ += char.length;

            this.__joinCmdAndInsert__(parts);
        };

        /**
        * Moves the cursor to a different position
        * @param {Number} pos
        * @public
        */
        Prompt.prototype.moveCursorTo = function (pos) {
            this.__curPos__ = pos < 0 ? 0 : (pos > this.__cmd__.length ? this.__cmd__.length : pos);

            var parts = this.__getCmdParts__(), curChar = parts[1].charAt(0);

            this.__cursor__.html(curChar ? this.__sys__.graphic.htmlEncode(curChar) : '&nbsp;');

            this.__joinCmdAndInsert__(parts);

            // let's always end selection time here
            this.__isSel__ = false;
        };

        /**
        * Moves the cursor forward
        * @public
        */
        Prompt.prototype.moveCursorForward = function () {
            this.moveCursorTo(this.__curPos__ + 1);
        };

        /**
        * Moves the cursor backward
        * @public
        */
        Prompt.prototype.moveCursorBackward = function () {
            this.moveCursorTo(this.__curPos__ - 1);
        };

        /**
        * Moves the cursor to the beginning
        * @public
        */
        Prompt.prototype.moveCursorHome = function () {
            this.moveCursorTo(0);
        };

        /**
        * Moves the cursor to the end
        * @public
        */
        Prompt.prototype.moveCursorEnd = function () {
            this.moveCursorTo(this.__cmd__.length);
        };

        /**
        * Shows the previous command in the input
        * @public
        */
        Prompt.prototype.showPreviousCmd = function () {
            this.__cmd__ = this.__program__.strTabs + this.__history__.previous();
            this.moveCursorEnd();
        };

        /**
        * Shows the next command in the input
        * @public
        */
        Prompt.prototype.showNextCmd = function () {
            this.__cmd__ = this.__program__.strTabs + this.__history__.next();
            this.moveCursorEnd();
        };

        /**
        * Selects a range of characters to the left
        * @public
        */
        Prompt.prototype.selectLeftRange = function () {
            while (this.selectLeftChar())
                ;
            console.log('[Prompt#selectLeftRange] Range selected: "' + this.__selection__ + '"');
        };

        /**
        * Selects a range of characters to the right
        * @public
        */
        Prompt.prototype.selectRightRange = function () {
            while (this.selectRightChar())
                ;
            console.log('[Prompt#selectRightRange] Range selected: "' + this.__selection__ + '"');
        };

        /**
        * Selects characters from the left on
        * @returns {Boolean} indicates the beginning of the cmd
        * @public
        */
        Prompt.prototype.selectLeftChar = function () {
            if (this.__curPos__ > 0) {
                this.__charSelection__();
                this.__selection__.modify('extend', 'backward', 'character');
                this.__curPos__--;
                return true;
            } else {
                return false;
            }
        };

        /**
        * Selects characters from the right on
        * @returns {Boolean} indicates the end of the cmd
        * @public
        */
        Prompt.prototype.selectRightChar = function () {
            if (this.__curPos__ < this.__cmd__.length) {
                this.__charSelection__();
                this.__selection__.modify('extend', 'forward', 'character');
                this.__curPos__++;
                return true;
            } else {
                return false;
            }
        };

        Prompt.prototype.isCmdEmpty = function () {
            return !!this.__cmd__.match(/^\s*$/);
        };

        /**
        * Clears the command line
        * @public
        */
        Prompt.prototype.clear = function () {
            console.log('[Prompt#clear] Clearing the input...');
            this.__cmd__ = '';
            this.moveCursorTo(0);
        };

        /**
        * Sends BACKSPACE/DEL to the input
        * @param {String} type [backspace|del]
        * @public
        */
        Prompt.prototype.delete = function (key) {
            if (this.__cmd__ !== '') {
                if (this.__isSel__) {
                    this.__deleteSelection__();
                } else {
                    this.__deleteCharacter__(key);
                }
            }
        };

        /**
        * Sends a tab
        * @param {Number} [n = 1]
        * @public
        */
        Prompt.prototype.tab = function (n) {
            if (typeof n === "undefined") { n = 1; }
            while (n--)
                this.insert(Config.tab);
        };

        /**
        * Sends enter
        * @param {Boolean} shift
        * @public
        */
        Prompt.prototype.enter = function (shift) {
            var cmd = this.__cmd__.replace(Utils.INIT_SPACES_RE, ''), prog = this.__program__, endProg;

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
                if (prog.numLines === 1)
                    this.__symbol__.html('&nbsp;&nbsp;&nbsp;&nbsp;');

                // sends as many tabs as there are in the previous line
                if (prog.numTabs)
                    this.tab(prog.numTabs);
            } else {
                // hides the prompt while the command is running
                // for asynchronous operations
                // this.hide();
            }

            // returns the symbol at the end of the program
            (endProg && this.__symbol__.html(Config.symbol));
        };

        /**
        * Sends HOME/END keys
        * @param {String} where (end|home)
        * @param {Boolean} shift
        * @public
        */
        Prompt.prototype.jump = function (where, shift) {
            switch (where) {
                case 'home':
                    if (shift) {
                        this.selectLeftRange();
                    } else {
                        this.moveCursorHome();
                    }

                    break;
                case 'end':
                    if (shift) {
                        this.selectRightRange();
                    } else {
                        this.moveCursorEnd();
                    }

                    break;
            }
        };

        /**
        * Sends arrows
        * @param {String} which [up|down|left|right]
        * @param {Boolean} shift
        * @public
        */
        Prompt.prototype.arrow = function (which, shift) {
            switch (which) {
                case 'up':
                    this.showPreviousCmd();
                    break;
                case 'down':
                    this.showNextCmd();
                    break;

                case 'left':
                    if (shift) {
                        this.selectLeftChar();
                    } else {
                        this.moveCursorBackward();
                    }

                    break;
                case 'right':
                    if (shift) {
                        this.selectRightChar();
                    } else {
                        this.moveCursorForward();
                    }

                    break;
            }
        };

        /**
        * Sends a character
        * @param {String} c
        * @public
        */
        Prompt.prototype.char = function (c) {
            var prog = this.__program__;

            if (prog.isBlock && this.isCmdEmpty() && c === '}') {
                // we're in a block and closing in with a single '}'
                // Let's move the cursor one tab back
                this.clear();
                this.tab(prog.numTabs - 1);
            }

            this.insert(c);
        };

        /**
        * Copies selected text to the clipboard
        * @public
        */
        Prompt.prototype.copy = function () {
        };

        /**
        * Gets triggered on keypress
        * @param {String} type
        * @param {String} key
        * @param {Any} extra
        * @event
        */
        Prompt.prototype.onKeypress = function (type, key, extra) {
            if (Utils.isFunction(this[type])) {
                this[type](key, extra);
            }
        };

        /**
        * Gets triggered on document click
        * @event
        */
        Prompt.prototype.onDocumentClick = function () {
            this.moveCursorTo(this.__curPos__);
        };

        /**
        * Gets triggered when the output is done printing
        * @event
        */
        Prompt.prototype.onOutputDone = function () {
            this.show();
            this.el.scrollIntoView();
        };
        return Prompt;
    })(DOMWrap);

    
    return Prompt;
});
