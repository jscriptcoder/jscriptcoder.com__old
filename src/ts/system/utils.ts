/**
 * @module system/utils
 * @exports Utils
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

/**
 * Holds a bunch of utilities
 * @namespace Utils
 */
module Utils {

    /**
     * Matches spaces
     * @type RegExp
     */
    export var SPACES_RE = createRegExp('\\s', 'g');
    
    /**
     * Matches initial spaces
     * @type RegExp
     */
    export var INIT_SPACES_RE = createRegExp('^\\s+');
    
    /**
     * Matches tabs
     * @type RegExp
     * @static
     */
    export var TABS_RE = createRegExp('\\t', 'g');
    
    /**
     * window API
     * @type Window
     */
    export var win = window;
    
    /**
     * document API
     * @type Document
     */
    export var doc = document;

    /**
     * Will be used for type checking
     * @type Function
     */
    var toString = Object.prototype.toString;
    
    /**
     * jQuery-like query selector
     * @type Document
     */
    var $ = doc.querySelectorAll.bind(doc);
    
    /**
     * Whether or not the value is an array
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isArray(value) {
        return toString.call(value) === '[object Array]';
    }

    /**
     * Whether or not the value is defined
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isDefined(value){
        return typeof value !== 'undefined';
    }

    /**
     * Whether or not the value is a string
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isString(value) {
        return typeof value === 'string';
    }

    /**
     * Whether or not the value is an object
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isObject(value) {
        return value != null && typeof value === 'object';
    }
       
    /**
     * Whether or not the value is a number
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isNumber(value){ 
        return typeof value === 'number';
    }
        
    /**
     * Whether or not the value is an DOM element
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isHTMLElement(value) {
        return !!(value && value.nodeName);
    }
       
    /**
     * Whether or not the value is a function
     * @param {Any} value
     * @returns {Boolean}
     * @memberof Utils
     */
    export function isFunction(value){
        return typeof value === 'function';
    }
     
    /**
     * Wrapper for document.createElement method
     * @param {String} tagName
     * @return {HTMLElement}
     * @memberof Utils
     */
    export function createElement(tagName) {
        return doc.createElement(tagName);
    }
    
    /**
     * Wrapper for document.getElementById method
     * @param {String} id
     * @return {HTMLElement}
     * @public
     */
    export function getElementById(id) {
        return doc.getElementById(id);
    }
    
    /**
     * Wrapper for document.getElementsByTagName method
     * @param {String} id
     * @return {HTMLCollection}
     * @public
     */
    export function getElementsByTagName(tagName) {
        return doc.getElementsByTagName(tagName);
    }
       
    /**
     * Wrapper for document.getElementsByClassName method
     * @param {String} id
     * @return {HTMLCollection}
     * @public
     */
    export function getElementsByClassName(className) {
        return doc.getElementsByClassName(className);
    }
        
    /**
     * jQuery-like query selector
     * @param {String} sel
     * @return {HTMLCollection}
     * @memberof Utils
     */
    export function query(sel) {
        return $(sel);
    }
        
    /**
     * Queries just one element
     * @param {String} sel
     * @return {HTMLElement}
     * @memberof Utils
     */
    export function queryOne(sel) {
        return query(sel)[0];
    }
        
    /**
     * Returns the string representation of a charCode
     * @param {Number} code
     * @return {String}
     * @memberof Utils
     */
    export function toChar(code) {
        return String.fromCharCode(code);
    }
        
    /**
     * Creates a unique ID
     * @param {String} [pre = '']
     * @param {String} [pos = '']
     * @return {String}
     * @memberof Utils
     */
    export function uid(pre = '', pos = '') {
        return pre + (new Date()).getTime() + pos;
    }
        
    /**
     * Wrapper for document.getSelection method
     * @return {Selection}
     * @see Selection {@link https://developer.mozilla.org/en-US/docs/Web/API/Selection}
     * @public
     */
    export function getSelection() {
        return doc.getSelection();
    }
        
    /**
     * Wrapper for document.createRange method
     * @return {Selection}
     * @see Range {@link https://developer.mozilla.org/en-US/docs/Web/API/Range}
     * @public
     */
    export function createRange() {
        return doc.createRange();
    }
        
    /**
     * Wrapper for RegExp instance
     * @param {String} pattern
     * @param {String} [mods]
     * @return {RegExp}
     * @public
     */
    export function createRegExp(pattern, mods = '') {
        return new RegExp(pattern, mods);
    }

}

export = Utils;