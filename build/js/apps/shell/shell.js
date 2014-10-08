/**
* @module apps/shell/shell
* @requires system/drivers/graphic/domwrap
* @requires apps/shell/config
* @requires apps/shell/output
* @requires apps/shell/prompt
* @exports Shell
* @author Francisco Ramos <fran@jscriptcoder.com>
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

            _super.call(this, sys.graphic.createGUI(Config.template, true));

            this.__sys__ = sys;
            this.__output__ = this.__createOutput__(this.findOne(Config.outputSel));
            this.__prompt__ = this.__createPrompt__(this.findOne(Config.promptSel));

            this.__printHeader__();
        }
        Object.defineProperty(Shell.prototype, "sys", {
            /**
            * sys getter
            * @readonly
            * @returns {System}
            * @public
            */
            get: function () {
                return this.__sys__;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Shell.prototype, "output", {
            /**
            * output getter
            * @readonly
            * @returns {Output}
            * @public
            */
            get: function () {
                return this.__output__;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Shell.prototype, "prompt", {
            /**
            * prompt getter
            * @readonly
            * @returns {Prompt}
            * @public
            */
            get: function () {
                return this.__prompt__;
            },
            enumerable: true,
            configurable: true
        });

        Shell.prototype.__printHeader__ = function () {
            var _this = this;
            this.prompt.hide();

            this.__sys__.filesystem.read('apps/shell/header.txt').then(function (data) {
                return _this.__output__.print(data);
            }).catch(function (reason) {
                console.warn('Error:', reason);
                _this.__sys__.interrupt('output', reason, 'error');
            });
        };

        /**
        * Instantiates an Output object. Makes it easy to mock
        * @param {HTMLElement} el
        * @returns {Output}
        * @private
        */
        Shell.prototype.__createOutput__ = function (el) {
            return new Output(el, this.__sys__);
        };

        /**
        * Instantiates a Prompt object. Makes it easy to mock
        * @param {HTMLElement} el
        * @returns {Prompt}
        * @private
        */
        Shell.prototype.__createPrompt__ = function (el) {
            return new Prompt(el, this.__sys__, this.onCommand.bind(this));
        };

        /**
        * Gets trigger when the user sends the js command by pressing enter
        * @param {String} cmd
        * @param {Boolean} shift
        * @event
        */
        Shell.prototype.onCommand = function (cmd, shift) {
            this.__output__.print(this.__prompt__.toString());

            if (shift) {
                console.log('[Shell#onCommand] line:', cmd);
            } else {
                console.log('[Shell#onCommand] command:', cmd);
                this.__sys__.interrupt('command', cmd);
            }
        };
        return Shell;
    })(DOMWrap);

    
    return Shell;
});
