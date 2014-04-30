/**
* @module system/utils
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
        * Whether or not the value is an DOM element
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isDOMElement(value) {
            return !!(value && value.nodeName);
        }
        Utils.isDOMElement = isDOMElement;

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
    })(Utils || (Utils = {}));

    
    return Utils;
});
