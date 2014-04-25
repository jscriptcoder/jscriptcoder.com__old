/**
 * @module system/drivers/graphic/domwrap
 * @requires system/utils
 * @exports DOMWrap
 */

import Utils = require('../../utils');

/**
 * jQuery-like wrapper for HTMLElements
 * @class DOMWrap
 */
class DOMWrap {
   
    /**
     * Easily-parseable/retrievable ID or TAG or CLASS selectors (borrowed from Sizzle)
     * @type RegExp
     * @static
     */
    static rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    
    /**
     * @type HTMLElement
     * @private
     */
    __el__;

    /**
     * @constructor
     * @param {HTMLElement} el
     * @throws {Error} Wrong DOM element
     */
    constructor(el) {
    
    console.log('[DOMWrap#constructor] Hooking up DOM:', el);
        
        if (Utils.isDOMElement(el)) {
            this.__el__ = el;
        } else {
            throw Error('[DOMWrap#constructor] Wrong DOM element');
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
    rmClass(cls) {
        this.__el__.classList.remove(cls);
    }

    /**
     * Empties the element by setting innerHTML to ''
     * @public
     */
    empty() {
        this.__el__.innerHTML = '';
    }

    
    /**
     * Gets back a DOM elements found by tag or .class
     * @param {String} selector
     * @returns {HTMLElement}
     * @public
     */
    find(selector) {
        var match = DOMWrap.rquickExpr.exec(selector), m;
        
        if (match[2]) {
            return this.__el__.getElementsByTagName(selector);
        } else if ((m = match[3])) {
            return this.__el__.getElementsByClassName(m);
        } else {
            return this.__el__.querySelectorAll(selector);
        }
        
    }

}

export = DOMWrap;