/**
* @module system/ring3
* @requires system/ring
* @exports Ring3
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './ring'], function(require, exports, Ring) {
    /**
    * Provides all the users with the outter level of privileges and API
    * @class Ring3
    * @extends Ring
    */
    var Ring3 = (function (_super) {
        __extends(Ring3, _super);
        /**
        * @constructor
        */
        function Ring3(sys) {
            console.info('[Ring3#constructor] Instantiating...');
            _super.call(this, sys);
        }
        /**
        * Shows all the available commands for this ring
        * @returns {String}
        * @public
        */
        Ring3.prototype.help = function () {
            return "Please, be patient... I'm still working on it";
        };
        return Ring3;
    })(Ring);

    
    return Ring3;
});
