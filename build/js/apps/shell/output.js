/**
* Shell Output
* @module apps/shell/output
* @requires system/drivers/graphic/domwrap
* @exports Output
* @author Francisco Ramos <fran@jscriptcoder.com>
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
        * @param {System} shell
        * @param {HTMLElement} kpEl
        * @constructor
        */
        function Output(el, sys) {
            console.log('[Output#constructor] Setting up shell output...');

            _super.call(this, el);

            this.__sys__ = sys;

            sys.graphic.output = this.el;
        }
        /**
        * Sends a message to the output
        * @param {String|String[]} message
        * @param {string} [type]
        * @public
        */
        Output.prototype.print = function (message, type) {
            this.__sys__.interrupt('output', message, type);
        };
        return Output;
    })(DOMWrap);

    
    return Output;
});
