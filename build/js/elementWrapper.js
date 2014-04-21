/**
* @module elementWrapper
* @exports ElementWrapper
*/
define(["require", "exports"], function(require, exports) {
    /**
    * HTMLElement wrapper
    * @class ElementWrapper
    */
    var ElementWrapper = (function () {
        /**
        * @constructor
        * @param {String|HTMLElemen t} el
        * @throws {Error} Wrong parameter
        */
        function ElementWrapper(el) {
            if (typeof el === 'string') {
                this.__el__ = document.querySelector(el);
            } else if (el && el.nodeType) {
                this.__el__ = el;
            } else {
                throw Error('Wrong parameter: ' + el);
            }
        }
        Object.defineProperty(ElementWrapper.prototype, "el", {
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
        ElementWrapper.prototype.hide = function () {
            this.__el__.style.display = 'none';
        };

        /**
        * Shows the element
        * @public
        */
        ElementWrapper.prototype.show = function () {
            this.__el__.style.display = '';
        };

        /**
        * Wrapper for appendChild method
        * @param {HTMLElement} el
        * @public
        */
        ElementWrapper.prototype.append = function (el) {
            this.__el__.appendChild(el);
        };

        /**
        * Wrapper for classList.add method
        * @param {String} cls
        * @public
        */
        ElementWrapper.prototype.addClass = function (cls) {
            this.__el__.classList.add(cls);
        };

        /**
        * Wrapper for classList.remove method
        * @param {String} cls
        * @public
        */
        ElementWrapper.prototype.removeClass = function (cls) {
            this.__el__.classList.remove(cls);
        };
        return ElementWrapper;
    })();

    
    return ElementWrapper;
});
