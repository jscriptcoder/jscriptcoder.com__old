/**
* @module utils
* @exports Utils
*/
define(["require", "exports"], function(require, exports) {
    /**
    * Holds a bunch of utilities
    * @namespace Utils
    */
    var Utils;
    (function (Utils) {
        /**
        * Will be used for type checking
        * @type Function
        */
        var toString = Object.prototype.toString;

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
        * Strips all the html from the input
        * @param {String} html
        * @returns {String}
        * @memberof Utils
        */
        function stripHtml(html) {
            if (typeof html === "undefined") { html = ''; }
            return html.replace(/(<[^>]+>)/ig, '');
        }
        Utils.stripHtml = stripHtml;

        /**
        * Returns the url query string parameter
        * @param {String} key
        * @param {String} [qs = window.location.href]
        * @returns {String}
        * @memberof Utils
        */
        function getUrlParam(key, qs) {
            if (typeof qs === "undefined") { qs = window.location.href; }
            var results = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(qs);
            return (results && results[1]) ? decodeURIComponent(results[1]) : '';
        }
        Utils.getUrlParam = getUrlParam;

        /**
        * Returns the url hashtag parameter
        * @param {String} [qs = window.location.href]
        * @returns {String}
        * @memberof Utils
        */
        function getUrlHashtag(qs) {
            if (typeof qs === "undefined") { qs = window.location.href; }
            var results = new RegExp('#([^#]*)').exec(qs);
            return (results && results[1]) ? decodeURIComponent(results[1]) : '';
        }
        Utils.getUrlHashtag = getUrlHashtag;
    })(Utils || (Utils = {}));

    
    return Utils;
});
