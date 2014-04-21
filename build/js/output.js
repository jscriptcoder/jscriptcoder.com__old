/**
* @module output
* @exports Output
* @requires wrapper
* @requires utils
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './wrapper', './utils'], function(require, exports, Wrapper, Utils) {
    /**
    * @class Output
    * @extends Wrapper
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
        * @param {String|String[]} msg
        * @throws {Error} Wrong parameter
        * @public
        */
        Output.prototype.print = function (msg) {
            var _this = this;
            var div = document.createElement('div');

            if (Utils.isArray(msg)) {
                msg.forEach(function (val) {
                    return _this.print(val);
                });
            } else if (Utils.isString) {
                div.innerHTML = msg.replace(/^\s/, '&nbsp;');
            } else {
                throw Error('Wrong parameter: ' + msg);
            }

            this.append(div);
        };
        return Output;
    })(Wrapper);

    
    return Output;
});
