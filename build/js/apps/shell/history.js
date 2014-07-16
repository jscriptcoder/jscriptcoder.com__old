/**
* Input history
* @module apps/shell/history
* @requires system/mem/mem
* @requires system/utils/utils
* @requires apps/shell/config
* @exports History
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../system/mem/mem', '../../system/utils/utils', './config'], function(require, exports, Mem, Utils, Config) {
    /**
    * Keeps track of a history of commands. Yes I know, pointless stuff.
    * I should use an array instead of an object/hashtable for this purpose
    * @class History
    * @extends Mem
    */
    var History = (function (_super) {
        __extends(History, _super);
        /**
        * Initializes an instance of History
        * @param {HTMLElement} el
        * @param {System} shell
        * @param {HTMLElement} kpEl
        * @constructor
        */
        function History() {
            console.log('[History#constructor] Initializing History memory...');
            _super.call(this);

            this.__addrs__ = [];
        }
        Object.defineProperty(History.prototype, "index", {
            /**
            * index getter
            * @readonly
            * @returns {Number}
            * @public
            */
            get: function () {
                return this.__index__;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Gets a command in that index
        * @param {Number} [index = this.index]
        * @return {Any}
        * @public
        */
        History.prototype.get = function (idx) {
            if (typeof idx === "undefined") { idx = this.index; }
            return _super.prototype.get.call(this, this.__addrs__[idx]) || '';
        };

        /**
        * Gets the first command in the history
        * @returns {Any}
        * @public
        */
        History.prototype.first = function () {
            return this.get(0);
        };

        /**
        * Gets next command
        * @returns {Any}
        * @public
        */
        History.prototype.next = function () {
            var idx = this.__index__, limit = this.__addrs__.length;
            this.__index__ = idx < limit ? idx + 1 : limit;
            return this.get();
        };

        /**
        * Gets previous command
        * @returns {Any}
        * @public
        */
        History.prototype.previous = function () {
            var idx = this.__index__;
            this.__index__ = idx > 0 ? idx - 1 : 0;
            return this.get();
        };

        /**
        * Gets the last command in the history
        * @returns {Any}
        * @public
        */
        History.prototype.last = function () {
            return this.get(this.__addrs__.length - 1);
        };

        /**
        * Adds a new command to the list
        * @param {String} cmd
        * @return {Number}
        * @public
        */
        History.prototype.add = function (cmd) {
            // we skip the storing if the cmd is empty
            if (Utils.isString(cmd) && !cmd)
                return this.__addrs__.length;

            // we skip the storing if the cmd is the same as the last one
            if (cmd === this.last())
                return this.__addrs__.length;

            var addr = Utils.uid(History.prefix);
            this.put(addr, cmd);
            this.__addrs__.push(addr);

            if (Config.historyLimit < this.size()) {
                // we have surpassed the limit, let's delete the first command from the history
                addr = this.__addrs__.shift();
                this.delete(addr);
            }

            return this.__index__ = this.__addrs__.length;
        };
        History.prefix = 'CMD_';
        return History;
    })(Mem);

    
    return History;
});
