/**
* @module views/console
* @requires Backbone
* @exports Console
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'backbone'], function(require, exports, Backbone) {
    /**
    * @class Console
    * @extends Backbone.View
    */
    var Console = (function (_super) {
        __extends(Console, _super);
        function Console() {
            _super.apply(this, arguments);
            /**
            * Holds a reference to the DOM element
            * @type {HTMLElement}
            */
            this.el = document.getElementById('console');
        }
        /**
        * Clears the console
        * @public
        */
        Console.prototype.clear = function () {
            this.el.innerHTML = '';
        };
        return Console;
    })(Backbone.View);
    ;

    
    return Console;
});
