/**
* Memory allocation
* @module system/mem
* @requires system/utils
* @requires system/alloc
* @exports Mem
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './utils', './alloc'], function(require, exports, Utils, Alloc) {
    /**
    * Allocates memory for the system, programs, etc...
    * @class Mem
    * @extends Alloc
    */
    var Mem = (function (_super) {
        __extends(Mem, _super);
        /**
        * Initializes an instance of Mem
        * @constructor
        */
        function Mem() {
            console.info('[Mem#constructor] Allocating memory...');
            _super.call(this);

            this.__storage__ = {};
            this.__length__ = 0;
        }
        /**
        * Gets info from the memory
        * @param {String} addr
        * @returns {Any}
        * @public
        */
        Mem.prototype.get = function (addr) {
            return addr ? this.__storage__[addr] : void (0);
        };

        /**
        * Stores info in memory, returning the size
        * @param {String} addr
        * @param {Any} info
        * @returns {Number}
        * @public
        */
        Mem.prototype.put = function (addr, info) {
            console.log('[Mem#put] Adding', info, 'into', addr);

            if (!this.is(addr))
                this.__length__++;
            this.__storage__[addr] = info;
            return this.__length__;
        };

        /**
        * Deletes info from memory, returning the size
        * @param {String} addr
        * @returns {Number}
        * @public
        */
        Mem.prototype.delete = function (addr) {
            console.log('[Mem#delete] Deleging', addr);

            if (this.is(addr))
                this.__length__--;
            delete this.__storage__[addr];
            return this.__length__;
        };

        /**
        * Returns the size of taken up memory
        * @returns {Number}
        * @public
        */
        Mem.prototype.size = function () {
            return this.__length__;
        };

        /**
        * Indicates whether or not there is something that address
        * @param {String} addr
        * @returns {Boolean}
        * @public
        */
        Mem.prototype.is = function (addr) {
            return Utils.isDefined(this.__storage__[addr]);
        };
        return Mem;
    })(Alloc);

    
    return Mem;
});
