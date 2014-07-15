/**
* @module system/system
* @requires system/interrupts
* @requires system/drivers/graphic/graphic
* @requires system/drivers/keyboard/keyboard
* @requires system/ring3
* @requires system/utils
* @exports System
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './interrupts', './drivers/graphic/graphic', './drivers/keyboard/keyboard', './ring3', './utils'], function(require, exports, Interrups, Graphic, Keyboard, Ring3, Utils) {
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
            console.info('[System#constructor] Initializing system and drivers...');

            _super.call(this);

            this.__graphic__ = this.__createGraphicDriver__();
            this.__keyboard__ = this.__createKeyboardDriver__();
            this.__ring__ = this.__createRing__();

            this.__listen__();
        }
        /**
        * Installs necessary interruption-listeners
        * @private
        */
        System.prototype.__listen__ = function () {
            this.listen('click', this.__onDocumentClick__.bind(this), Utils.doc);
        };

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

        /**
        * Instantiates the first ring level
        * @returns {Ring}
        * @private
        */
        System.prototype.__createRing__ = function () {
            return new Ring3(this);
        };

        /**
        * Gets triggered when the user clicks on the document
        * @param {Event} e
        * @event
        */
        System.prototype.__onDocumentClick__ = function (e) {
            this.interrupt('documentclick', e);
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
        return System;
    })(Interrups);

    
    return System;
});
