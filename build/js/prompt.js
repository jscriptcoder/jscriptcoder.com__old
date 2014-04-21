/**
* @module prompt
* @exports Prompt
* @requires elementWrapper
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './elementWrapper'], function(require, exports, ElementWrapper) {
    /**
    * @class Prompt
    * @extends ElementWrapper
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
        * Gets trigger when the user types in the kpEl passed in the constructor
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeydown = function (e) {
        };

        /**
        * Gets trigger when the user types in the kpEl passed in the constructor
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeypress = function (e) {
        };

        /**
        * Gets trigger when the user types in the kpEl passed in the constructor
        * @event
        * @param {Event} e
        */
        Prompt.prototype.onKeyup = function (e) {
        };
        return Prompt;
    })(ElementWrapper);

    
    return Prompt;
});
