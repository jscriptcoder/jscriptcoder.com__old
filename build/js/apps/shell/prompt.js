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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/utils', '../../system/drivers/graphic/domwrap', './config', './history'], function(require, exports, Utils, DOMWrap, Config, History) {
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
            this.__selection__ = this.__getSelection__();
            this.__range__ = this.__createRange__();

            this.__isSel__ = false;
            this.__cmd__ = '';
            this.__curPos__ = 0; // zero-base

            this.__sys__.listen('keypress', this.onKeypress.bind(this));
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
        * Instantiates a History object. Makes it easy to mock
        * @returns {History}
        * @private
        */
        Prompt.prototype.__createHistory__ = function () {
            return new History();
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
            var left = parts[0], right = parts[1], sys = this.__sys__, tmp = Utils.createElement('div');

            this.__cmd__ = left + right;

            tmp.innerHTML = sys.encode(left);
            tmp.appendChild(this.__cursor__.el);
            tmp.innerHTML += sys.encode(right.substr(1));

            this.__input__.html(tmp.innerHTML);
        };

        /**
        * Removes the cursor from the input
        * @private
        */
        Prompt.prototype.__removeCursor__ = function () {
            this.__input__.html(this.__sys__.encode(this.__cmd__));
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
            this.__curPos__++;

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

            this.__cursor__.html(curChar ? this.__sys__.encode(curChar) : '&nbsp;');

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
            this.__cmd__ = this.__history__.previous();
            this.moveCursorEnd();
        };

        /**
        * Shows the next command in the input
        * @public
        */
        Prompt.prototype.showNextCmd = function () {
            this.__cmd__ = this.__history__.next();
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
        * @public
        */
        Prompt.prototype.tab = function () {
            this.insert('\t');
        };

        /**
        * Sends enter
        * @public
        */
        Prompt.prototype.enter = function () {
            this.__onEnter__(this.__cmd__);
            this.__history__.add(this.__cmd__);
            this.clear();
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
        return Prompt;
    })(DOMWrap);

    
    return Prompt;
});
