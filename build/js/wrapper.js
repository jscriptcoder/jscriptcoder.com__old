/**
* @module wrapper
* @exports Wrapper
*/
define(["require", "exports"], function(require, exports) {
    /**
    * @class Wrapper
    */
    var Wrapper = (function () {
        /**
        * @constructor
        * @param {String|HTMLElemen t} el
        * @throws {Error} Wrong parameter
        */
        function Wrapper(el) {
            if (typeof el === 'string') {
                this.__el__ = document.querySelector(el);
            } else if (el && el.nodeType) {
                this.__el__ = el;
            } else {
                throw Error('Wrong parameter: ' + el);
            }
        }
        Object.defineProperty(Wrapper.prototype, "el", {
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
        Wrapper.prototype.hide = function () {
            this.__el__.style.display = 'none';
        };

        /**
        * Shows the element
        * @public
        */
        Wrapper.prototype.show = function () {
            this.__el__.style.display = '';
        };

        /**
        * Wrapper for appendChild method
        * @param {HTMLElement} el
        * @public
        */
        Wrapper.prototype.append = function (el) {
            this.__el__.appendChild(el);
        };

        /**
        * Wrapper for classList.add method
        * @param {String} cls
        * @public
        */
        Wrapper.prototype.addClass = function (cls) {
            this.__el__.classList.add(cls);
        };

        /**
        * Wrapper for classList.remove method
        * @param {String} cls
        * @public
        */
        Wrapper.prototype.removeClass = function (cls) {
            this.__el__.classList.remove(cls);
        };
        return Wrapper;
    })();

    
    return Wrapper;
});
