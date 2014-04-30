/**
 * HTML graphic driver
 * @module system/drivers/graphic/graphic
 * @requires system/utils
 * @requires system/drivers/graphic/domwrap
 * @requires system/drivers/graphic/config
 * @exports Graphic
 */

import Utils = require('../../utils');
import DOMWrap = require('./domwrap');
import Config = require('./config');

/**
 * @class Graphic
 * @extends DOMWrap
 */
class Graphic extends DOMWrap {

    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * Elements to output content, "this.el" by default
     * @type HTMLElement
     * @private
     */
    __output__;
    
    /**
     * Initializes an instance of Graphic, calling the constructor of DOMWrap
     * @param {System} sys
     * @param {HTMLElement} [screenEl = <div id="screen" />]
     * @constructor
     */
    constructor(sys, screenEl?) {
    
        console.log('[Graphic#constructor] Initializing graphic driver...');
    
        super(screenEl || sys.doc.getElementById(Config.screenElemId) || sys.doc.body);
    
        this.__sys__ = sys;
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
            throw Error('[Graphic#set output] Wrong DOM element');
        }
        
    }

    /**
     * Creates DOM elements from a html strings
     * @param {String} html
     * @returns {HTMLElement}
     * @public
     */
    createElementByHtml(htmlEl = '') {
        var tmp = this.__sys__.createElement('div');
        tmp.innerHTML = htmlEl;
        return tmp.firstChild;
    }

    /**
     * Creates and append a new DOM element to another element
     * @param {String|HTMLElement} html
     * @param {HTMLElement} [appendTo = this.output]
     * @returns {HTMLElement}
     * @throws {Error} Wrong parameter
     * @public
     */
    appendHtmlElement(html, appendTo = this.output) {
        var el;
        
        if (Utils.isString(html)) {
            el = this.createElementByHtml(html);   
        } else if (Utils.isDOMElement(html)) {
            el = html;
        } else {
            throw Error('[Graphic#appendHtmlElement] Wrong parameter');
        }
        
        appendTo.appendChild(el);
        
        return el;
    }

    /**
     * Gets back a DOM element by #id, tag or .class (implementation inspired by Sizzle)
     * @param {String} selector
     * @param {HTMLElement} contextEl
     * @returns {HTMLElement}
     * @public
     */
    getDOMElement(selector, contextEl) {
        var match = Graphic.rquickExpr.exec(selector), m;
        
        if ((m = match[1])) {
            return this.__sys__.getElementById(m);
        } else if (match[2]) {
            return contextEl.getElementsByTagName(selector)[0];
        } else if ((m = match[3])) {
            return contextEl.getElementsByClassName(m)[0];
        } else {
            return contextEl.querySelectorAll(selector)[0];
        }
        
    }

    /**
     * Returns a string with the HTML entities in order to be used in HTML literals
     * @param {String} str
     * return {String}
     * @public
     */
    htmlEncode(str) {
        var el = this.__sys__.createElement('div');
        el.innerText = el.textContent = str;
        return el.innerHTML
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/ /g, '&nbsp;');
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
          
            var div = this.__sys__.createElement('div');
            div.innerHTML = message.replace(/^\s/g, '&nbsp;');
            this.appendHtmlElement(div, appendTo);

        } else {
            
            throw Error('[Graphic#print] Wrong message');
            
        }

    }
          
    /**
     * Empties the output by setting innerHTML to ''
     * @param {Boolean} all
     * @public
     */
    empty(all?) {
          
        if (all) {
            super.empty();
            this.output = this.el; // redirects the output to the main screen element
        } else {
            this.output.innerHTML = '';
        }
        
    }
    
}
          
export = Graphic;