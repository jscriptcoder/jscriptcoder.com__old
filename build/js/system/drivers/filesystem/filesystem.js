/**
* File System access
* @module system/drivers/filesystem/filesystem
* @requires XMLHttpRequest
* @exports Filesystem
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", './config'], function(require, exports, Config) {
    /**
    * @class Filesystem. Reads files using xhr transport
    */
    var Filesystem = (function () {
        /**
        * Initializes an instance of Filesystem
        * @param {System} sys
        * @constructor
        */
        function Filesystem(sys) {
            console.info('[Filesystem#constructor] Initializing filesystem driver...');

            this.__sys__ = sys;

            console.info('[Filesystem#constructor] Instantiating XMLHttpRequest...');
            this.__xhr__ = new XMLHttpRequest();
        }
        /**
        * Will GET the content using ajax, calling the right callback
        * @param {string} url
        * @param {Function} success
        * @param {Function} error
        * @private
        */
        Filesystem.prototype.__get__ = function (url, success, error) {
            var xhr = this.__xhr__;

            xhr.open('GET', url, true);

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    // Success!
                    success(xhr.responseText);
                } else {
                    // we reached our target server, but it returned an error
                    error('Server error');
                }
            };

            xhr.onerror = function () {
                // there was a connection error of some sort
                error('Connection error');
            };

            xhr.send();
        };

        /**
        * Reads files. If second parameter is true, it'll parse the content as JSON
        * @param {String} filename
        * @param {boolean} [json=false]
        * @returns {Promise}
        * @public
        */
        Filesystem.prototype.read = function (filename, json) {
            var _this = this;
            if (typeof json === "undefined") { json = false; }
            console.log('[Filesystem#read] Reads data from', filename);

            var xhr = this.__xhr__;

            return new Promise(function (resolve, reject) {
                _this.__get__(Config.fsBasePath + filename, function (data) {
                    return resolve(json ? JSON.parse(data) : data);
                }, function (reason) {
                    return reject(reason);
                });
            });
        };
        return Filesystem;
    })();

    
    return Filesystem;
});
