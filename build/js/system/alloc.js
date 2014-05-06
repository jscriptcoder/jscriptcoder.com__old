/**
* @module system/alloc
* @exports Alloc
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports"], function(require, exports) {
    /**
    * Abstract class that provides the basic methods for allocation of storage
    * @lcass Alloc
    */
    var Alloc = (function () {
        function Alloc() {
        }
        /**
        * Gets info from the storate device
        * @param {String} addr
        * @returns {Any}
        * @abstract
        */
        Alloc.prototype.get = function (addr) {
            throw Error('Implement this method');
        };

        /**
        * Stores info in the storate device
        * @param {String} addr
        * @param {Any} info
        * @abstract
        */
        Alloc.prototype.put = function (addr, info) {
            throw Error('Implement this method');
        };

        /**
        * Deletes info from the storate device
        * @abstract
        */
        Alloc.prototype.delete = function (key) {
            throw Error('Implement this method');
        };

        /**
        * Returns the size of the storage
        * @returns {Number}
        * @abstract
        */
        Alloc.prototype.size = function () {
            throw Error('Implement this method');
        };

        /**
        * Indicates whether or not there is something in there
        * @param {String} addr
        * @returns {Boolean}
        * @abstract
        */
        Alloc.prototype.is = function (addr) {
            throw Error('Implement this method');
        };
        return Alloc;
    })();

    
    return Alloc;
});
