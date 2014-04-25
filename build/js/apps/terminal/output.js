/**
* Terminal Output
* @module apps/terminal/output
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
        * @constructor
        * @param {HTMLElement} el
        * @param {System} sys
        * @param {HTMLElement} kpEl
        */
        function Output(el, sys) {
            console.log('[Output#constructor] Setting up terminal output...');

            _super.call(this, el);

            this.__sys__ = sys;

            sys.setOutput(this.el);
        }
        /**
        * Sends a message to the output
        * @param {String|String[]} message
        * @public
        */
        Output.prototype.print = function (message) {
            this.__sys__.print(message);
        };
        return Output;
    })(DOMWrap);

    
    return Output;
});
