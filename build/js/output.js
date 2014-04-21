/**
* @module output
* @exports Output
* @requires elementWrapper
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './elementWrapper'], function(require, exports, ElementWrapper) {
    /**
    * @class Output
    * @extends ElementWrapper
    */
    var Output = (function (_super) {
        __extends(Output, _super);
        /**
        * @constructor
        * @param {String|HTMLElement} el
        */
        function Output(el) {
            _super.call(this, el);
        }
        /**
        * Prints a message wrapping it in a div
        * @param {String} msg
        * @public
        */
        Output.prototype.print = function (msg) {
            var div = document.createElement('div');
            div.innerText = msg;
            this.append(div);
        };
        return Output;
    })(ElementWrapper);

    
    return Output;
});
