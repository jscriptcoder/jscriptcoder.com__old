/**
* @module apps/terminal/terminal
* @requires system/drivers/graphic/domwrap
* @requires apps/terminal/config
* @requires apps/terminal/output
* @requires apps/terminal/prompt
* @exports Terminal
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/drivers/graphic/domwrap', './config', './output', './prompt'], function(require, exports, DOMWrap, Config, Output, Prompt) {
    /**
    * Terminal application for user interaction with the system
    * @class Terminal
    * @extends DOMWrap
    */
    var Terminal = (function (_super) {
        __extends(Terminal, _super);
        /**
        * @constructor
        * @param {System} sys
        */
        function Terminal(sys) {
            console.log('[Terminal#constructor] Initializing terminal app...');

            _super.call(this, sys.createElement(Config.template));

            sys.appendElement(this.el);

            this.__sys__ = sys;
            this.__output__ = new Output(this.find('.output')[0], sys);
            this.__prompt__ = new Prompt(this.find('.prompt')[0], sys);

            this.__output__.print(Config.msgHeader);
        }
        return Terminal;
    })(DOMWrap);

    
    return Terminal;
});
