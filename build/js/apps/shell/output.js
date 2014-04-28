/**
* Shell Output
* @module apps/shell/output
* @requires system/drivers/graphic/domwrap
* @exports Output
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/drivers/graphic/domwrap'], function(require, exports, DOMWrap) {
    /**
    * Outputs the result of commands
    * @class Output
    * @extends DOMWrap
    */
    var Output = (function (_super) {
        __extends(Output, _super);
        /**
        * Initializes an instance of Output
        * @param {HTMLElement} el
        * @param {Terminal} termin
        * @param {HTMLElement} kpEl
        * @constructor
        */
        function Output(el, sys) {
            console.log('[Output#constructor] Setting up shell output...');

            _super.call(this, el);

            this.__graphic__ = sys.graphic;

            this.__graphic__.setOutput(this.el);
        }
        /**
        * Sends a message to the output
        * @param {String|String[]} message
        * @public
        */
        Output.prototype.print = function (message) {
            this.__graphic__.print(message);
        };
        return Output;
    })(DOMWrap);

    
    return Output;
});
