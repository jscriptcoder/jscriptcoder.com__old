/**
* @module system/utils/utils
* @exports Utils
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports"], function(require, exports) {
    /**
    * Holds a bunch of utilities
    * @namespace Utils
    */
    var Utils;
    (function (Utils) {
        /**
        * Matches spaces
        * @type RegExp
        */
        Utils.SPACES_RE = createRegExp('\\s', 'g');

        /**
        * Matches initial spaces
        * @type RegExp
        */
        Utils.INIT_SPACES_RE = createRegExp('^\\s+');

        /**
        * Matches tabs
        * @type RegExp
        * @static
        */
        Utils.TABS_RE = createRegExp('\\t', 'g');

        /**
        * window API
        * @type Window
        */
        Utils.win = window;

        /**
        * document API
        * @type Document
        */
        Utils.doc = document;

        /**
        * Will be used for type checking
        * @type Function
        */
        var toString = Object.prototype.toString;

        /**
        * jQuery-like query selector
        * @type Document
        */
        var $ = Utils.doc.querySelectorAll.bind(Utils.doc);

        /**
        * Whether or not the value is an array
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isArray(value) {
            return toString.call(value) === '[object Array]';
        }
        Utils.isArray = isArray;

        /**
        * Whether or not the value is defined
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isDefined(value) {
            return typeof value !== 'undefined';
        }
        Utils.isDefined = isDefined;

        /**
        * Whether or not the value is a string
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isString(value) {
            return typeof value === 'string';
        }
        Utils.isString = isString;

        /**
        * Whether or not the value is an object
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isObject(value) {
            return value != null && typeof value === 'object';
        }
        Utils.isObject = isObject;

        /**
        * Whether or not the value is a number
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isNumber(value) {
            return typeof value === 'number';
        }
        Utils.isNumber = isNumber;

        /**
        * Whether or not the value is an DOM element
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isHTMLElement(value) {
            return !!(value && value.nodeName);
        }
        Utils.isHTMLElement = isHTMLElement;

        /**
        * Whether or not the value is a function
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isFunction(value) {
            return typeof value === 'function';
        }
        Utils.isFunction = isFunction;

        /**
        * Wrapper for document.createElement method
        * @param {String} tagName
        * @return {HTMLElement}
        * @memberof Utils
        */
        function createElement(tagName) {
            return Utils.doc.createElement(tagName);
        }
        Utils.createElement = createElement;

        /**
        * Wrapper for document.getElementById method
        * @param {String} id
        * @return {HTMLElement}
        * @public
        */
        function getElementById(id) {
            return Utils.doc.getElementById(id);
        }
        Utils.getElementById = getElementById;

        /**
        * Wrapper for document.getElementsByTagName method
        * @param {String} id
        * @return {HTMLCollection}
        * @public
        */
        function getElementsByTagName(tagName) {
            return Utils.doc.getElementsByTagName(tagName);
        }
        Utils.getElementsByTagName = getElementsByTagName;

        /**
        * Wrapper for document.getElementsByClassName method
        * @param {String} id
        * @return {HTMLCollection}
        * @public
        */
        function getElementsByClassName(className) {
            return Utils.doc.getElementsByClassName(className);
        }
        Utils.getElementsByClassName = getElementsByClassName;

        /**
        * jQuery-like query selector
        * @param {String} sel
        * @return {HTMLCollection}
        * @memberof Utils
        */
        function query(sel) {
            return $(sel);
        }
        Utils.query = query;

        /**
        * Queries just one element
        * @param {String} sel
        * @return {HTMLElement}
        * @memberof Utils
        */
        function queryOne(sel) {
            return query(sel)[0];
        }
        Utils.queryOne = queryOne;

        /**
        * Returns the string representation of a charCode
        * @param {Number} code
        * @return {String}
        * @memberof Utils
        */
        function toChar(code) {
            return String.fromCharCode(code);
        }
        Utils.toChar = toChar;

        /**
        * Creates a unique ID
        * @param {String} [pre = '']
        * @param {String} [pos = '']
        * @return {String}
        * @memberof Utils
        */
        function uid(pre, pos) {
            if (typeof pre === "undefined") { pre = ''; }
            if (typeof pos === "undefined") { pos = ''; }
            return pre + (new Date()).getTime() + pos;
        }
        Utils.uid = uid;

        /**
        * Wrapper for document.getSelection method
        * @return {Selection}
        * @see Selection {@link https://developer.mozilla.org/en-US/docs/Web/API/Selection}
        * @public
        */
        function getSelection() {
            return Utils.doc.getSelection();
        }
        Utils.getSelection = getSelection;

        /**
        * Wrapper for document.createRange method
        * @return {Selection}
        * @see Range {@link https://developer.mozilla.org/en-US/docs/Web/API/Range}
        * @public
        */
        function createRange() {
            return Utils.doc.createRange();
        }
        Utils.createRange = createRange;

        /**
        * Wrapper for RegExp instance
        * @param {String} pattern
        * @param {String} [mods]
        * @return {RegExp}
        * @public
        */
        function createRegExp(pattern, mods) {
            if (typeof mods === "undefined") { mods = ''; }
            return new RegExp(pattern, mods);
        }
        Utils.createRegExp = createRegExp;

        /**
        * Wrapper for setTimeout function
        * @param {Function} fn
        * @param {Number} [delay=0]
        * @return {Number}
        * @public
        */
        function async(fn, delay) {
            if (typeof delay === "undefined") { delay = 0; }
            return setTimeout(fn, delay);
        }
        Utils.async = async;
    })(Utils || (Utils = {}));

    
    return Utils;
});
