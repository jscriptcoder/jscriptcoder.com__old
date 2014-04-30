/**
* @module system/system
* @requires system/interrupts
* @requires system/drivers/graphic/graphic
* @requires system/drivers/keyboard/keyboard
* @exports System
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './interrupts', './drivers/graphic/graphic', './drivers/keyboard/keyboard'], function(require, exports, Interrups, Graphic, Keyboard) {
    /**
    * Contains the System API and acts as a mediator between drivers and apps
    * @class System
    * @extends Interrupts
    */
    var System = (function (_super) {
        __extends(System, _super);
        /**
        * Initializes the system, drivers, etc...
        * @param {HTMLElement} doc
        * @constructor
        */
        function System() {
            console.log('[System#constructor] Initializing system and drivers...');

            _super.call(this);

            this.__graphic__ = new Graphic(this);
            this.__keyboard__ = new Keyboard(this);
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

        Object.defineProperty(System.prototype, "keyboard", {
            /**
            * keyboard getter
            * @returns {Keyboard}
            * @public
            */
            get: function () {
                return this.__keyboard__;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Wrapper for document.createElement method
        * @param {String} tagName
        * @return {HTMLElement}
        * @public
        */
        System.prototype.createElement = function (tagName) {
            return System.doc.createElement(tagName);
        };

        /**
        * Wrapper for document.getElementById method
        * @param {String} id
        * @return {HTMLElement}
        * @public
        */
        System.prototype.getElementById = function (id) {
            return System.doc.getElementById(id);
        };

        /**
        * Encodes a string to be displayed properly
        * @param {String} str
        * @public
        */
        System.prototype.encode = function (str) {
            return this.__graphic__.htmlEncode(str);
        };

        /**
        * Creates a new GUI
        * @param {String} gui
        * @param {Boolean} attach
        * @returns {HTMLElement}
        * @public
        */
        System.prototype.createGUI = function (gui, attach) {
            return attach ? this.__graphic__.appendHtmlElement(gui) : this.__graphic__.createElementByHtml(gui);
        };

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
        * Sets the output element for content display
        * @param {HTMLElement} el
        * @public
        */
        System.prototype.setOutput = function (el) {
            this.__graphic__.output = el;
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
        * Installs keypress listeners on an element
        * @param {HTMLElement} [el = this.doc]
        * @public
        */
        System.prototype.installKeypressInterrupts = function (el) {
            if (typeof el === "undefined") { el = this.doc; }
            var keyboard = this.__keyboard__;

            this.listen('keypress', keyboard.onKeypress.bind(keyboard), el);
            this.listen('keydown', keyboard.onKeydown.bind(keyboard), el);
        };
        System.doc = document;

        System.global = window;
        return System;
    })(Interrups);

    
    return System;
});
