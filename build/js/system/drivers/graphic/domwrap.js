/**
* @module system/drivers/graphic/domwrap
* @requires system/utils
* @exports DOMWrap
*/
define(["require", "exports", '../../utils'], function(require, exports, Utils) {
    /**
    * jQuery-like wrapper for HTMLElements
    * @class DOMWrap
    */
    var DOMWrap = (function () {
        /**
        * @constructor
        * @param {HTMLElement} el
        * @throws {Error} Wrong DOM element
        */
        function DOMWrap(el) {
            console.log('[DOMWrap#constructor] Hooking up DOM:', el);

            if (Utils.isDOMElement(el)) {
                this.__el__ = el;
            } else {
                throw Error('[DOMWrap#constructor] Wrong DOM element');
            }
        }
        Object.defineProperty(DOMWrap.prototype, "el", {
            /**
            * el getter
            * @readonly
            * @returns {HTMLElement}
            * @public
            */
            get: function () {
                return this.__el__;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Hides the element
        * @public
        */
        DOMWrap.prototype.hide = function () {
            this.__el__.style.display = 'none';
        };

        /**
        * Shows the element
        * @public
        */
        DOMWrap.prototype.show = function () {
            this.__el__.style.display = '';
        };

        /**
        * Wrapper for appendChild method
        * @param {HTMLElement} el
        * @public
        */
        DOMWrap.prototype.append = function (el) {
            this.__el__.appendChild(el);
        };

        /**
        * Wrapper for classList.add method
        * @param {String} cls
        * @public
        */
        DOMWrap.prototype.addClass = function (cls) {
            this.__el__.classList.add(cls);
        };

        /**
        * Wrapper for classList.remove method
        * @param {String} cls
        * @public
        */
        DOMWrap.prototype.rmClass = function (cls) {
            this.__el__.classList.remove(cls);
        };

        /**
        * Empties the element by setting innerHTML to ''
        * @public
        */
        DOMWrap.prototype.empty = function () {
            this.__el__.innerHTML = '';
        };

        /**
        * Gets back a DOM elements found by tag or .class
        * @param {String} selector
        * @returns {HTMLCollection}
        * @public
        */
        DOMWrap.prototype.find = function (selector) {
            var match = DOMWrap.rquickExpr.exec(selector), m;

            if (match[2]) {
                return this.__el__.getElementsByTagName(selector);
            } else if ((m = match[3])) {
                return this.__el__.getElementsByClassName(m);
            } else {
                return this.__el__.querySelectorAll(selector);
            }
        };

        /**
        * Gets back a single DOM element
        * @param {String} selector
        * @returns {HTMLElement}
        * @public
        */
        DOMWrap.prototype.findOne = function (selector) {
            return this.find(selector)[0];
        };
        DOMWrap.rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
        return DOMWrap;
    })();

    
    return DOMWrap;
});
