/**
* Terminal Prompt
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

        /**
        * Gets trigger on keydown
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeydown = function (e) {
            console.log(String.fromCharCode(e.which));
        };
        return Prompt;
    })(DOMWrap);

    
    return Prompt;
});
