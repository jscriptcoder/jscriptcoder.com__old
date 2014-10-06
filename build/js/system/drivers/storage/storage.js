/**
* Data storage device
* @module system/drivers/storage/storage
* @requires bower_components/firebase/firebase
* @requires system/mem/alloc
* @exports Storage
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../mem/alloc', './config', "/bower_components/firebase/firebase.js"], function(require, exports, Alloc, Config) {
    /**
    * @class Storage. Internally it uses Firebase as a storage in the cloud
    * @extends Alloc
    */
    var Storage = (function (_super) {
        __extends(Storage, _super);
        /**
        * Initializes an instance of Storage
        * @param {System} sys
        * @constructor
        */
        function Storage(sys) {
            console.info('[Storage#constructor] Initializing data storage driver...');

            _super.call(this);

            this.__sys__ = sys;

            console.info('[Storage#constructor] Instantiating Firebase...');
            this.__firebase__ = new Firebase(Config.firebaseUrl);
        }
        /**
        * Gets info from the storage
        * @param {String} addr
        * @returns {Any}
        * @public
        */
        Storage.prototype.get = function (addr) {
            var _this = this;
            console.log('[Storage#get] Getting data from', addr);

            return new Promise(function (resolve, reject) {
                _this.__firebase__.child(addr).once('value', function (data) {
                    console.info('[Storage#get] Got data:', data);
                    resolve(data.val());
                }, function () {
                    console.warn('[Storage#get] Error: Permission denied');
                    reject('No permissions');
                });
            });
        };

        /**
        * Stores info permanently, returning the size
        * @param {String} addr
        * @param {Any} info
        * @returns {Number}
        * @public
        */
        Storage.prototype.put = function (addr, info) {
            console.log('[Storage#put] Adding', info, 'into', addr);
        };

        /**
        * Deletes info from the storage, returning the size
        * @param {String} addr
        * @returns {Number}
        * @public
        */
        Storage.prototype.delete = function (addr) {
            console.log('[Storage#delete] Deleging', addr);
        };

        /**
        * Returns the size of the storage
        * @returns {Number}
        * @public
        */
        Storage.prototype.size = function () {
        };

        /**
        * Indicates whether or not there is something in that address
        * @param {String} addr
        * @returns {Boolean}
        * @public
        */
        Storage.prototype.is = function (addr) {
        };
        return Storage;
    })(Alloc);

    
    return Storage;
});
