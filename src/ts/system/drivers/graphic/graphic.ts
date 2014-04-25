/**
 * @module system/drivers/graphic/graphic
 * @requires system/utils
 * @requires system/system
 * @requires system/drivers/graphic/domwrap
 * @exports Graphic
 */

import Utils = require('../../utils');
import DOMWrap = require('./domwrap');

/**
 * @class Graphic
 * @extends DOMWrap
 */
class Graphic extends DOMWrap {

    /**
     * We need this reference in order to use document API
     * @type HTMLElement
     * @static
     */
    static doc = document;
    
    /**
     * Elements to output content, "this.el" by default
     * @type HTMLElement
     * @private
     */
    __output__;
    
    /**
     * @constructor
     * @param {HTMLElement} [screenEl = <div id="screen" />]
     */
    constructor(screenEl?) {
    
        console.log('[Graphic#constructor] Initializing graphic driver...');
    
        super(screenEl || Graphic.doc.getElementById('screen') || document.body);
    
        this.__output__ = this.el;
    }

    /**
     * output getter
     * @returns {HTMLElement}
     * @public
     */
    get output() {
        return this.__output__;
    }

    /**
     * output setter
     * @param {HTMLElement} output
     * @throws {Error} Wrong DOM element
     * @public
     */
    set output(output) {
        if (Utils.isDOMElement(output)) {
            this.__output__ = output;
        } else {
            throw Error('[DOMWrap#setOutput] Wrong DOM element');
        }
        
    }

    /**
     * Creates DOM elements from html strings
     * @param {String} html
     * @returns {HTMLElement}
     * @public
     */
    createDOMElement(html = '') {
        var div = Graphic.doc.createElement('div');
        div.innerHTML = html;
        return div.children[0];
    }

    /**
     * Creates and append a new DOM element to another element
     * @param {String|HTMLElement} html
     * @param {HTMLElement} [appendTo = this.output]
     * @returns {HTMLElement}
     * @public
     */
    appendDOMElement(html, appendTo = this.output) {
        var el;
        
        if (Utils.isString(html)) {
            el = this.createDOMElement(html);   
        } else if (Utils.isDOMElement(html)) {
            el = html;
        } else {
            throw Error('')
        }
        
        appendTo.appendChild(el);
        
        return el;
    }

    /**
     * Gets back a DOM element by #id, tag or .class
     * @param {String} selector
     * @param {HTMLElement} [contextEl = Graphic.doc]
     * @returns {HTMLElement}
     * @public
     */
    getDOMElement(selector, contextEl = Graphic.doc) {
        var match = Graphic.rquickExpr.exec(selector), m;
        
        if ((m = match[1])) {
            return Graphic.doc.getElementById(m);
        } else if (match[2]) {
            return contextEl.getElementsByTagName(selector)[0];
        } else if ((m = match[3])) {
            return contextEl.getElementsByClassName(m)[0];
        } else {
            return contextEl.querySelectorAll(selector)[0];
        }
        
    }

    /**
     * Prints a message wrapping it in a div
     * @param {String|String[]} message
     * @param {HTMLElement} [appendTo = this.output]
     * @throws {Error} Wrong message
     * @public
     */
    print(message, appendTo?) {
          
        if (Utils.isArray(message)) { // there are more than one line
            
            message.forEach((line) => this.print(line));
            
        } else if (Utils.isString(message)) { // single line
          
            console.log('[Graphic#print] Printing message:', message);
          
            var div = Graphic.doc.createElement('div');
            div.innerHTML = message.replace(/^\s/g, '&nbsp;');
            this.appendDOMElement(div, appendTo);

        } else {
            
            throw Error('[Graphic#print] Wrong message');
            
        }

    }

          
    /**
     * Empties the output by setting innerHTML to ''
     * @public
     */
    empty() {
        this.output.innerHTML = '';
    }
    
}
          
export = Graphic;