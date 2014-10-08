/**
 * File System access
 * @module system/drivers/filesystem/filesystem
 * @requires XMLHttpRequest
 * @exports Filesystem
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Config = require('./config');

/**
 * @class Filesystem. Reads files using xhr transport
 */
class Filesystem {
    
    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * @type XMLHttpRequest
     * @private
     */
    __xhr__;
    
    /**
     * Initializes an instance of Filesystem
     * @param {System} sys
     * @constructor
     */
    constructor(sys) {
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
    __get__(url, success, error) {
        var xhr = this.__xhr__;
        
        xhr.open('GET', url, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400){
                // Success!
                success(xhr.responseText);
            } else {
                // we reached our target server, but it returned an error
                error('Server error');
            }
        };

        xhr.onerror = () => {
            // there was a connection error of some sort
            error('Connection error');
        };

        xhr.send();
    }
    
    /**
     * Reads files. If second parameter is true, it'll parse the content as JSON
     * @param {String} filename
     * @param {boolean} [json=false]
     * @returns {Promise}
     * @public
     */
    read(filename, json = false) {
        console.log('[Filesystem#read] Reads data from', filename);
        
        var xhr = this.__xhr__;
        
        return new Promise((resolve, reject) => {
            
            this.__get__(
                Config.fsBasePath + filename, 
                (data) => resolve(json ? JSON.parse(data) : data), 
                (reason) => reject(reason)
            );
            
        });
        
    }
    
}

export = Filesystem;