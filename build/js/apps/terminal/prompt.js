/**
* Terminal prompt
* @module apps/terminal/prompt
* @requires system/drivers/graphic/domwrap
* @requires apps/terminal/config
* @exports Prompt
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/drivers/graphic/domwrap', './config'], function(require, exports, DOMWrap, Config) {
    /**
    * Prompt user interface
    * @class Prompt
    * @extends DOMWrap
    */
    var Prompt = (function (_super) {
        __extends(Prompt, _super);
        /**
        * @constructor
        * @param {HTMLElement} el
        * @param {System} sys
        * @param {HTMLElement} kpEl
        */
        function Prompt(el, sys) {
            console.log('[Prompt#constructor] Setting up terminal prompt...');

            _super.call(this, el);

            this.__sys__ = sys;
            this.__symbol__ = this.findOne(Config.symbolSel);
            this.__input__ = this.findOne(Config.inputSel);
            this.__cursor__ = this.findOne(Config.cursorSel);

            this.__cmd__ = '';
            this.__curPos__ = 0; // zero-base

            sys.listen('keypress', this.onKeypress.bind(this));
            sys.listen('keydown', this.onKeydown.bind(this));
        }
        Object.defineProperty(Prompt.prototype, "cmd", {
            /**
            * command getter
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
        * Encodes the parameter to show it properly in the html input
        * @param {String} str
        * @returns {String}
        * @private
        */
        Prompt.prototype.__encode__ = function (str) {
            return str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g, '&nbsp;');
        };

        /**
        * Splits the command into two, left and right to the cursor
        * @returns {String[]}
        * @private
        */
        Prompt.prototype.__splitCmd__ = function () {
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
            var left = parts[0], right = parts[1];

            this.__cmd__ = left + right;

            this.__input__.innerHTML = this.__encode__(left);
            this.__input__.appendChild(this.__cursor__);
            this.__input__.innerHTML += this.__encode__(right.substr(1));
        };

        /**
        * Inserts a new character in the input
        * @param {String} char
        * @public
        */
        Prompt.prototype.insert = function (char) {
            var parts = this.__splitCmd__();

            // adds a char to the left part
            parts[0] += char;
            this.__curPos__++;

            this.__joinCmdAndInsert__(parts);
        };

        /**
        * Applies backspace on the input
        * @public
        */
        Prompt.prototype.backspace = function () {
            if (this.__cmd__ !== '') {
                var parts = this.__splitCmd__();

                // deletes last char from the left part
                parts[0] = parts[0].slice(0, -1);
                this.__curPos__--;

                this.__joinCmdAndInsert__(parts);
            }
        };

        /**
        * Moves the cursor to a different position
        * @param {Number} pos
        * @public
        */
        Prompt.prototype.moveCursorTo = function (pos) {
            this.__curPos__ = pos < 0 ? 0 : (pos > this.__cmd__.length ? this.__cmd__.length : pos);

            var parts = this.__splitCmd__(), curChar = parts[1].charAt(0);

            this.__cursor__.innerHTML = curChar ? this.__encode__(curChar) : '&nbsp;';

            this.__joinCmdAndInsert__(parts);
        };

        /**
        * Gets trigger on keypress
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeypress = function (e) {
            e.preventDefault();

            if (!e.ctrlKey && !e.altKey) {
                this.insert(String.fromCharCode(e.which));
            }
        };

        /**
        * Gets trigger on keydown. Filters out special keys
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeydown = function (e) {
            switch (e.which) {
                case 8:
                    e.preventDefault();

                    console.log('BACKSPACE');

                    this.backspace();

                    break;
                case 9:
                    e.preventDefault();

                    console.log('TAB');

                    this.insert('\t');

                    break;
                case 13:
                    e.preventDefault();

                    console.log('ENTER');

                    break;
                case 38:
                case 40:
                    e.preventDefault();

                    console.log('UP/DOWN - History');

                    break;
                case 36:
                case 35:
                case 37:
                case 39:
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
                case 67:
                case 86:
                    if (e.ctrlKey) {
                        e.preventDefault();

                        console.log('COPY/PASTE');
                        // TODO
                    }

                    break;
            }
        };

        /**
        * Processes the command after hitting enter. Implemented by Terminal
        * @abstract
        * @param {String} cmd
        * @public
        */
        Prompt.prototype.processCommand = function (cmd) {
        };
        return Prompt;
    })(DOMWrap);

    
    return Prompt;
});
