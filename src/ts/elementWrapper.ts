/**
 * @module elementWrapper
 * @exports ElementWrapper
 */

/**
 * HTMLElement wrapper
 * @class ElementWrapper
 */
class ElementWrapper {

    /**
     * @type HTMLElement
     * @private
     */
    __el__;

    /**
     * @constructor
     * @param {String|HTMLElemen t} el
     * @throws {Error} Wrong parameter
     */
    constructor(el) {
        if (typeof el === 'string') {
            this.__el__ = document.querySelector(el);
        } else if (el && el.nodeType) {
            this.__el__ = el;
        } else {
            throw Error('Wrong parameter: ' + el);
        }
    }

    /**
     * el getter
     * @readonly
     * @returns {HTMLElement}
     * @public
     */
    get el() {
        return this.__el__;
    }

    /**
     * Hides the element
     * @public
     */
    hide() {
        this.__el__.style.display = 'none';
    }

    /**
     * Shows the element
     * @public
     */
    show() {
        this.__el__.style.display = '';
    }

    /**
     * Wrapper for appendChild method
     * @param {HTMLElement} el
     * @public
     */
    append(el) {
        this.__el__.appendChild(el);
    }

    /**
     * Wrapper for classList.add method
     * @param {String} cls
     * @public
     */
    addClass(cls) {
        this.__el__.classList.add(cls);
    }

    /**
     * Wrapper for classList.remove method
     * @param {String} cls
     * @public
     */
    removeClass(cls) {
        this.__el__.classList.remove(cls);
    }
}

export = ElementWrapper;