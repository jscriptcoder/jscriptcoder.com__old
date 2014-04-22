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
    * Takes care of the output
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
        * @param {String|String[]} message
        * @throws {Error} Wrong parameter
        * @public
        */
        Output.prototype.print = function (message) {
            var _this = this;
            if (Utils.isArray(message)) {
                message.forEach(function (line) {
                    return _this.print(line);
                });
            } else if (Utils.isString(message)) {
                var div = this.create('div');
                div.innerHTML = message.replace(/^\s/, '&nbsp;');
                this.append(div);
            } else {
                throw Error('Wrong parameter: ' + message);
            }
        };
        return Output;
    })(Wrapper);

    
    return Output;
});
