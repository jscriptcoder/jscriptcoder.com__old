/**
 * @module wrapper
 * @exports Wrapper
 * @requires utils
 */

import Utils = require('./utils');

/**
 * jQuery-like wrapper for HTMLElements
 * @class Wrapper
 */
class Wrapper {

    /**
     * document element. Easy to mock
     * @type HTMLElement
     * @static
     */ 
    static doc = document;
    
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
            this.__el__ = Wrapper.doc.querySelector(el);
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

    /**
     * Wrapper for document.createElement method
     * @param {String} tag
     * @param {Object} [attrs]
     * @public
     */
    create(tag, attrs?) {
        var el = Wrapper.doc.createElement(tag);
        
        if (Utils.isObject(attrs)) {
            for (var p in attrs) {
                if (attrs.hasOwnProperty(p)) {
                    el.setAttribute(p, attrs[p]);
                }
            }
        }
        
        return el;
    }
}

export = Wrapper;