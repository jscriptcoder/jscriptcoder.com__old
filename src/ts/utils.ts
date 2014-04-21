/**
 * Holds a bunch of utilities
 * @module utils
 * @exports Utils
 */

/**
 * @namespace Utils
 */
module Utils {

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
    export function isString(value){
        return typeof value === 'string';
    }

    /**
     * Strips all the html from the input
     * @param {String} html
     * @returns {String}
     * @memberof Utils
     */
    export function stripHtml(html = '') {
        return html.replace(/(<[^>]+>)/ig, '');
    }

    /**
     * Returns the url query string parameter
     * @param {String} key
     * @param {String} [qs = window.location.href]
     * @returns {String}
     * @memberof Utils
     */
    export function getUrlParam (key, qs = window.location.href) {
        var results = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(qs);
        return (results && results[1]) ? decodeURIComponent(results[1]) : '';
    }

    /**
     * Returns the url hashtag parameter
     * @param {String} [qs = window.location.href]
     * @returns {String}
     * @memberof Utils
     */
    export function getUrlHashtag(qs = window.location.href) {
        var results = new RegExp('#([^#]*)').exec(qs);
        return (results && results[1]) ? decodeURIComponent(results[1]) : '';
    }

}

export = Utils;