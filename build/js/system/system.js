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

            this.__graphic__ = this.__createGraphicDriver__();
            this.__keyboard__ = this.__createKeyboardDriver__();
        }
        /**
        * Instantiates a Graphic driver. Makes it easy to mock
        * @returns {Graphic}
        * @private
        */
        System.prototype.__createGraphicDriver__ = function () {
            return new Graphic(this);
        };

        /**
        * Instantiates a Keyboard driver. Makes it easy to mock
        * @returns {Keyboard}
        * @private
        */
        System.prototype.__createKeyboardDriver__ = function () {
            return new Keyboard(this);
        };

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
        * Encodes a string to be displayed properly
        * @param {String} str
        * @throws {Error} Implemented by the graphic card
        * @public
        */
        System.prototype.encode = function (str) {
            throw Error('Implemented by the graphic card');
        };

        /**
        * Creates a new GUI
        * @param {String} gui
        * @param {Boolean} attach
        * @returns {HTMLElement}
        * @throws {Error} Implemented by the graphic card
        * @public
        */
        System.prototype.createGUI = function (gui, attach) {
            throw Error('Implemented by the graphic card');
        };

        /**
        * Empties only the output
        * @throws {Error} Implemented by the graphic card
        * @public
        */
        System.prototype.clearOutput = function () {
            throw Error('Implemented by the graphic card');
        };

        /**
        * Clears the whole screen
        * @throws {Error} Implemented by the graphic card
        * @public
        */
        System.prototype.clearScreen = function () {
            throw Error('Implemented by the graphic card');
        };

        /**
        * Sets the output element for content display
        * @param {HTMLElement} el
        * @throws {Error} Implemented by the graphic card
        * @public
        */
        System.prototype.setOutput = function (el) {
            throw Error('Implemented by the graphic card');
        };

        /**
        * Sends a string to the output
        * @param {String} msg
        * @throws {Error} Implemented by the graphic card
        * @public
        */
        System.prototype.output = function (msg) {
            throw Error('Implemented by the graphic card');
        };
        return System;
    })(Interrups);

    
    return System;
});
