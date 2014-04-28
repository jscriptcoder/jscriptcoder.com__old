/**
 * @module utils
 * @exports Utils
 */

/**
 * Holds a bunch of utilities
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
    export function isDOMElement(value) {
        return !!(value && value.nodeName);
    }

}

export = Utils;