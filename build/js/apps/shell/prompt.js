/**
* Shell prompt
* @module apps/shell/prompt
* @requires system/utils
* @requires system/drivers/graphic/domwrap
* @requires apps/shell/config
* @exports Prompt
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/utils', '../../system/drivers/graphic/domwrap', './config'], function(require, exports, Utils, DOMWrap, Config) {
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
        * @param {Shell} shell
        * @param {HTMLElement} kpEl
        * @constructor
        */
        function Prompt(el, shell) {
            console.log('[Prompt#constructor] Setting up shell prompt...');

            _super.call(this, el);

            this.__shell__ = shell;
            this.__sys__ = shell.sys;

            this.__symbol__ = this.findOne(Config.symbolSel, true);
            this.__input__ = this.findOne(Config.inputSel, true);
            this.__cursor__ = this.findOne(Config.cursorSel, true);

            this.__cmd__ = '';
            this.__curPos__ = 0; // zero-base

            this.__startListening__();
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
        * Starts listening to key events
        * @private
        */
        Prompt.prototype.__startListening__ = function () {
            var sys = this.__sys__;

            sys.listen('keypress', this.onKeypress.bind(this));
            sys.installKeypressInterrupts();
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
            var left = parts[0], right = parts[1], sys = this.__sys__, tmp = sys.createElement('div');

            this.__cmd__ = left + right;

            tmp.innerHTML = sys.encode(left);
            tmp.appendChild(this.__cursor__.el);
            tmp.innerHTML += sys.encode(right.substr(1));

            this.__input__.html(tmp.innerHTML);
        };

        /**
        * Inserts a new character in the input
        * @param {String} char
        * @public
        */
        Prompt.prototype.insert = function (char) {
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
        };

        /**
        * Sends BACKSPACE/DEL to the input
        * @param {String} type [backspace|del]
        * @public
        */
        Prompt.prototype.delete = function (key) {
            if (this.__cmd__ !== '') {
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
                            parts[1] = part[0] + part.substr(2);
                            break;
                    }

                    this.__joinCmdAndInsert__(parts);
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
            //this.onCommand(this.__cmd__);
        };

        /**
        * Sends HOME/END keys
        * @param {String} where (end|home);
        * @public
        */
        Prompt.prototype.jump = function (where) {
            this.moveCursorTo({
                'end': this.__cmd__.length,
                'home': 0
            }[where]);
        };

        /**
        * Sends arrows
        * @param {String} which [up|down|left|right]
        * @public
        */
        Prompt.prototype.arrow = function (which) {
            switch (which) {
                case 'up':
                case 'down':
                    break;

                case 'left':
                case 'right':
                    this.moveCursorTo({
                        'left': this.__curPos__ - 1,
                        'right': this.__curPos__ + 1
                    }[which]);
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
        * Gets triggered on keypress
        * @param {String} type
        * @param {String} key
        * @event
        */
        Prompt.prototype.onKeypress = function (type, key) {
            if (Utils.isFunction(this[type])) {
                this[type](key);
            }
        };
        return Prompt;
    })(DOMWrap);

    
    return Prompt;
});
