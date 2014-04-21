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
define(["require", "exports", './wrapper'], function(require, exports, Wrapper) {
    /**
    * @class Terminal
    * @extends Wrapper
    */
    var Terminal = (function (_super) {
        __extends(Terminal, _super);
        /**
        * @constructor
        * @param {String|HTMLElement} el
        * @param {Prompt} prompt
        * @param {Output} output
        */
        function Terminal(el, prompt, output) {
            _super.call(this, el);

            this.__prompt__ = prompt;
            this.__output__ = output;

            this.__output__.removeClass('hide');
            this.__prompt__.removeClass('hide');
        }
        Terminal.prototype.print = function (msg) {
            this.__output__.print(msg);
        };
        return Terminal;
    })(Wrapper);

    
    return Terminal;
});
