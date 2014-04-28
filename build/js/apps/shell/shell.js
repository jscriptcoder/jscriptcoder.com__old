/**
* @module apps/shell/shell
* @requires system/drivers/graphic/domwrap
* @requires apps/shell/config
* @requires apps/shell/output
* @requires apps/shell/prompt
* @exports Shell
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/drivers/graphic/domwrap', './config', './output', './prompt'], function(require, exports, DOMWrap, Config, Output, Prompt) {
    /**
    * Shell application for user interaction with the system
    * @class Terminal
    * @extends DOMWrap
    */
    var Shell = (function (_super) {
        __extends(Shell, _super);
        /**
        * Initializes an instance of Terminal`
        * @param {System} sys
        * @constructor
        */
        function Shell(sys) {
            console.log('[Terminal#constructor] Initializing terminal app...');

            _super.call(this, sys.createGUI(Config.template, true));

            this.__sys__ = sys;
            this.__output__ = new Output(this.findOne(Config.outputSel), sys);
            this.__prompt__ = new Prompt(this.findOne(Config.promptSel), sys);

            this.__prompt__.onCommand = this.onCommand.bind(this);

            this.__output__.print(Config.msgHeader);
        }
        /**
        * Gets trigger when the user sends the js command by pressing enter
        * @param {String} cmd
        * @event
        */
        Shell.prototype.onCommand = function (cmd) {
            console.log('[Terminal#onCommand] Command:', cmd);
        };
        return Shell;
    })(DOMWrap);

    
    return Shell;
});
