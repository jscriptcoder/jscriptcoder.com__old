/**
* @module terminal
* @exports Terminal
* @requires wrapper
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './wrapper', './prompt', './output'], function(require, exports, Wrapper, Prompt, Output) {
    /**
    * Terminal program
    * @class Terminal
    * @extends Wrapper
    */
    var Terminal = (function (_super) {
        __extends(Terminal, _super);
        /**
        * @constructor
        * @param {String|HTMLElement} el
        */
        function Terminal(el) {
            _super.call(this, el);

            this.__prompt__ = this.newPrompt();
            this.__prompt__.removeClass('hide');

            this.__output__ = this.newOutput();
            this.__output__.removeClass('hide');
        }
        /**
        * Creates an instance of Prompt. Easy to mock
        * @type Prompt
        * @public
        */
        Terminal.prototype.newPrompt = function () {
            return new Prompt(document.getElementById('prompt'), document);
        };

        /**
        * Creates an instance of Output. Easy to mock
        * @type Output
        * @public
        */
        Terminal.prototype.newOutput = function () {
            return new Output(document.getElementById('output'));
        };

        /**
        * Internally uses Output#print method
        * @param {String} message
        * @public
        */
        Terminal.prototype.print = function (message) {
            this.__output__.print(message);
        };
        return Terminal;
    })(Wrapper);

    
    return Terminal;
});
