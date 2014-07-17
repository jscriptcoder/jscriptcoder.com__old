/**
* First API level
* @module system/rings/ring3
* @requires system/rings/config
* @requires system/rings/ring
* @requires system/utils/utils
* @exports Ring3
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './config', './ring'], function(require, exports, Config, Ring) {
    /**
    * Provides all the users with the outter level of privileges and API
    * @class Ring3
    * @extends Ring
    */
    var Ring3 = (function (_super) {
        __extends(Ring3, _super);
        /**
        * @constructor
        * @param {System} sys
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
            var priv_re = /^_/, info = [], member;

            info = info.concat(Config.help.header);

            for (member in this) {
                if (member !== 'constructor' && !member.match(priv_re)) {
                    info.push(member + '()');
                }
            }

            return info;
        };

        /**
        * Clears up the screen emptying the output
        * @param {String} [arg]
        * @public
        */
        Ring3.prototype.clear = function (arg) {
            if (arg === '-h')
                return Config.help.clear;
            this.__sys__.interrupt('clearoutput');
        };
        return Ring3;
    })(Ring);

    
    return Ring3;
});
