/**
* @module prompt
* @exports Prompt
* @requires wrapper
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './wrapper'], function(require, exports, Wrapper) {
    /**
    * Takes care of the user input
    * @class Prompt
    * @extends Wrapper
    */
    var Prompt = (function (_super) {
        __extends(Prompt, _super);
        /**
        * @constructor
        * @param {String|HTMLElement} el
        * @param {String|HTMLElement} kpEl
        */
        function Prompt(el, kpEl) {
            _super.call(this, el);

            this.__symbol__ = this.__el__.querySelector('.symbol');
            this.__input__ = this.__el__.querySelector('.input');
            this.__cursor__ = this.__el__.querySelector('.cursor');

            kpEl.addEventListener('keydown', this.onKeydown.bind(this));
            kpEl.addEventListener('keypress', this.onKeypress.bind(this));
            kpEl.addEventListener('keyup', this.onKeyup.bind(this));
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
        };

        /**
        * Gets trigger on keypress
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeypress = function (e) {
        };

        /**
        * Gets trigger on keyup
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeyup = function (e) {
        };
        return Prompt;
    })(Wrapper);

    
    return Prompt;
});