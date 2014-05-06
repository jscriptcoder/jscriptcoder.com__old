/**
 * @module system/drivers/graphic/domwrap
 * @requires system/utils
 * @exports DOMWrap
 * @author Francisco Ramos <fran@jscriptcoder.com>
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
     * Initializes an instance of DOMWrap
     * @param {HTMLElement} el
     * @throws {Error} Wrong DOM element
     * @constructor
     */
    constructor(el) {
    
        console.log('[DOMWrap#constructor] Hooking up DOM:', el);
        
        if (Utils.isHTMLElement(el)) {
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
    get el() { return this.__el__ }

    /**
     * Hides the element
     * @public
     */
    hide() { this.__el__.style.display = 'none' }

    /**
     * Shows the element
     * @public
     */
    show() { this.__el__.style.display = '' }

    /**
     * Wrapper for appendChild method
     * @param {HTMLElement} el
     * @public
     */
    append(el) { this.__el__.appendChild(el) }

    /**
     * Wrapper for classList.add method
     * @param {String} cls
     * @public
     */
    addClass(cls) { this.__el__.classList.add(cls) }

    /**
     * Wrapper for classList.remove method
     * @param {String} cls
     * @public
     */
    rmClass(cls) { this.__el__.classList.remove(cls) }

    /**
     * Empties the element by setting innerHTML to ''
     * @public
     */
    empty() { this.__el__.innerHTML = '' }

    /**
     * Inserts or returns the html content of the element (jQuery#html like)
     * @param {String} [str]
     * @returns {HTMLElements}
     * @public
     */
    html(str?) {
        if (Utils.isString(str)) this.__el__.innerHTML = str;
        return this.__el__.innerHTML;
    }
    
    /**
     * Gets back a DOM elements found by tag or .class
     * @param {String} selector
     * @returns {HTMLCollection}
     * @public
     */
    find(selector) {
        var el = this.__el__, match = DOMWrap.rquickExpr.exec(selector), m;
        
        if (match[2]) {
            return el.getElementsByTagName(selector);
        } else if ((m = match[3])) {
            return el.getElementsByClassName(m);
        } else {
            return el.querySelectorAll(selector);
        }
        
    }

    /**
     * Gets back a single DOM element - wrapped in the DOMWrap is specified
     * @param {String} selector
     * @param {Boolean} [wrap]
     * @returns {HTMLElement|DOMWrap}
     * @public
     */
    findOne(selector, wrap?): any {
        var el = this.find(selector)[0];
        if (wrap) el = new DOMWrap(el);
        return el;
    }

}

export = DOMWrap;