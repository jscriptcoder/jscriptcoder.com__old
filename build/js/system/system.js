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
        * @param {HTMLElement} doc
        * @constructor
        */
        function System() {
            console.log('[System#constructor] Initializing system and drivers...');

            this.__graphic__ = new Graphic(System.doc);
        }
        Object.defineProperty(System.prototype, "global", {
            /**
            * global getter
            * @returns {Window}
            * @public
            */
            get: function () {
                return System.global;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(System.prototype, "doc", {
            /**
            * doc getter
            * @returns {Document}
            * @public
            */
            get: function () {
                return System.doc;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(System.prototype, "graphic", {
            /**
            * graphic getter
            * @returns {Graphic}
            * @public
            */
            get: function () {
                return this.__graphic__;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Empties only the output
        * @public
        */
        System.prototype.clearOutput = function () {
            this.__graphic__.empty();
        };

        /**
        * Clears the whole screen
        * @public
        */
        System.prototype.clearScreen = function () {
            this.__graphic__.empty(true);
        };

        /**
        * Sends a string to the output
        * @param {String} msg
        * @public
        */
        System.prototype.output = function (msg) {
            this.__graphic__.print(msg);
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

        System.global = window;
        return System;
    })();

    
    return System;
});
