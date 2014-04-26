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
            this.__input__.innerHTML = '';

            sys.listen('keypress', this.onKeypress.bind(this));
            sys.listen('keydown', this.onKeydown.bind(this));
        }
        Object.defineProperty(Prompt.prototype, "symbol", {
            /**
            * symbol getter
            * @readonly
            * @returns {HTMLElement}
            * @public
            */
            get: function () {
                return this.__symbol__;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Prompt.prototype, "input", {
            /**
            * input getter
            * @readonly
            * @returns {HTMLElement}
            * @public
            */
            get: function () {
                return this.__input__;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Prompt.prototype, "cursor", {
            /**
            * cursor getter
            * @readonly
            * @returns {HTMLElement}
            * @public
            */
            get: function () {
                return this.__cursor__;
            },
            enumerable: true,
            configurable: true
        });

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
        * Encodes the parameter to show it properly in the input
        * @param {String} str
        * @returns {String}
        * @public
        */
        Prompt.prototype.encode = function (str) {
            return str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g, '&nbsp;');
        };

        /**
        * Sets the content of the input, current command by default
        * @param {String} [str = this.cmd]
        * @public
        */
        Prompt.prototype.setInput = function (str) {
            if (typeof str === "undefined") { str = this.cmd; }
            this.__input__.innerHTML = this.encode(str);
        };

        /**
        * Inserts a character in the input
        * @param {String} char
        * @public
        */
        Prompt.prototype.insert = function (char) {
            this.__cmd__ += char;
            this.setInput();
        };

        /**
        * Applies backspace on the input
        * @public
        */
        Prompt.prototype.backspace = function () {
            if (this.__cmd__ !== '') {
                this.__cmd__ = this.__cmd__.slice(0, -1);
                this.setInput();
            }
        };

        /**
        * Applies enter on the input
        * @public
        */
        Prompt.prototype.enter = function () {
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
                console.log('keypress', e);
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

                    this.enter();

                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    console.log('UP/DOWN');
                    break;
                case 37:
                case 39:
                    e.preventDefault();
                    console.log('LEFT/RIGHT');
                    break;
                case 36:
                case 35:
                    e.preventDefault();
                    console.log('HOME/END');
                    break;
                case 67:
                case 86:
                    if (e.ctrlKey) {
                        e.preventDefault();
                        console.log('COPY/PASTE');
                    }
                    break;
                default:
                    console.log(e);
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
