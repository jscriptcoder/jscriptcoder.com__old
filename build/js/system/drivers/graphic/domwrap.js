/**
* @module system/drivers/graphic/domwrap
* @requires system/utils
* @exports DOMWrap
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", '../../utils'], function(require, exports, Utils) {
    /**
    * jQuery-like wrapper for HTMLElements
    * @class DOMWrap
    */
    var DOMWrap = (function () {
        /**
        * Initializes an instance of DOMWrap
        * @param {HTMLElement} el
        * @throws {Error} Wrong DOM element
        * @constructor
        */
        function DOMWrap(el) {
            console.log('[DOMWrap#constructor] Hooking up DOM:', el);

            if (Utils.isHTMLElement(el)) {
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
        * Inserts or returns the html content of the element (jQuery#html like)
        * @param {String} [str]
        * @returns {HTMLElements}
        * @public
        */
        DOMWrap.prototype.html = function (str) {
            if (Utils.isString(str))
                this.__el__.innerHTML = str;
            return this.__el__.innerHTML;
        };

        /**
        * Gets back a DOM elements found by tag or .class
        * @param {String} selector
        * @returns {HTMLCollection}
        * @public
        */
        DOMWrap.prototype.find = function (selector) {
            var el = this.__el__, match = DOMWrap.rquickExpr.exec(selector), m;

            if (match[2]) {
                return el.getElementsByTagName(selector);
            } else if ((m = match[3])) {
                return el.getElementsByClassName(m);
            } else {
                return el.querySelectorAll(selector);
            }
        };

        /**
        * Gets back a single DOM element - wrapped in the DOMWrap is specified
        * @param {String} selector
        * @param {Boolean} [wrap]
        * @returns {HTMLElement|DOMWrap}
        * @public
        */
        DOMWrap.prototype.findOne = function (selector, wrap) {
            var el = this.find(selector)[0];
            if (wrap)
                el = new DOMWrap(el);
            return el;
        };
        DOMWrap.rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
        return DOMWrap;
    })();

    
    return DOMWrap;
});
