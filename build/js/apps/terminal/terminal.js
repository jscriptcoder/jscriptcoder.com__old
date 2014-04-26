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
            this.__output__ = new Output(this.findOne(Config.outputSel), sys);
            this.__prompt__ = new Prompt(this.findOne(Config.promptSel), sys);

            this.__prompt__.processCommand = this.processCommand.bind(this);
            this.__output__.print(Config.msgHeader);
        }
        /**
        * Processes the command after hitting enter
        * @param {String} cmd
        * @public
        */
        Terminal.prototype.processCommand = function (cmd) {
            console.log('[Terminal#processCommand] Processing', cmd);
        };
        return Terminal;
    })(DOMWrap);

    
    return Terminal;
});
