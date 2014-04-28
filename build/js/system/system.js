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

            this.__graphic__ = new Graphic(this);
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
        * Creates a new HTML element based on the tagName
        * @param {String} name
        * @public
        */
        System.prototype.createElement = function (name) {
            throw Error('[System#createElement] must be implemented by the graphic driver');
        };

        /**
        * Encodes a string to be displayed properly
        * @param {String} str
        * @public
        */
        System.prototype.encode = function (str) {
            throw Error('[System#encode] must be implemented by the graphic driver');
        };

        /**
        * Creates a new GUI
        * @param {String} gui
        * @param {Boolean} attach
        * @returns {HTMLElement}
        * @public
        */
        System.prototype.createGUI = function (gui, attach) {
            throw Error('[System#createGUIElement] must be implemented by the graphic driver');
        };

        /**
        * Empties only the output
        * @public
        */
        System.prototype.clearOutput = function () {
            throw Error('[System#clearOutput] must be implemented by the graphic driver');
        };

        /**
        * Clears the whole screen
        * @public
        */
        System.prototype.clearScreen = function () {
            throw Error('[System#clearScreen] must be implemented by the graphic driver');
        };

        /**
        * Sets the output element for content display
        * @param {HTMLElement} el
        * @public
        */
        System.prototype.setOutput = function (el) {
            throw Error('[System#setOutput] must be implemented by the graphic driver');
        };

        /**
        * Sends a string to the output
        * @param {String} msg
        * @public
        */
        System.prototype.output = function (msg) {
            throw Error('[System#output] must be implemented by the graphic driver');
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
