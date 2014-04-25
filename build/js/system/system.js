/**
* @module system/system
* @requires system/drivers/graphic/graphic
* @exports System
*/
define(["require", "exports", './drivers/graphic/graphic'], function(require, exports, Graphic) {
    /**
    * Contains the System API
    * @class System
    */
    var System = (function () {
        /**
        * Initializes the system, drivers, etc...
        * @constructor
        */
        function System() {
            console.log('[System#constructor] Initializing system and drivers...');

            this.__graphic__ = new Graphic();
        }
        /**
        * Sets the output by default
        * @param {HTMLElement} output
        * @public
        */
        System.prototype.setOutput = function (output) {
            this.__graphic__.output = output;
        };

        /**
        * Creates DOM elements from html strings
        * @param {String} html
        * @returns {HTMLElement}
        * @public
        */
        System.prototype.createElement = function (html) {
            return this.__graphic__.createDOMElement(html);
        };

        /**
        * Appends an elements to the screen
        * @param {HTMLElement} el
        * @returns {HTMLElement}
        * @public
        */
        System.prototype.appendElement = function (el) {
            return this.__graphic__.appendDOMElement(el);
        };

        /**
        * Clears the screen
        * @public
        */
        System.prototype.clear = function () {
            this.__graphic__.empty();
        };

        /**
        * Prints a message
        * @param {String|String[]} message
        * @public
        */
        System.prototype.print = function (message) {
            this.__graphic__.print(message);
        };

        /**
        * Listens to events on a particular context
        * @param {String} evtName
        * @param {Function} handler
        * @param {HTMLElement} [context = System.doc]
        * @public
        */
        System.prototype.listen = function (evtName, handler, context) {
            if (typeof context === "undefined") { context = System.doc; }
            context.addEventListener(evtName, handler);
        };
        System.doc = document;
        return System;
    })();

    
    return System;
});
