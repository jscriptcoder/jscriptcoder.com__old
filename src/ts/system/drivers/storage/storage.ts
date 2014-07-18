/**
 * Data storage device
 * @module system/drivers/storage/storage
 * @requires bower_components/firebase/firebase
 * @requires system/mem/alloc
 * @exports Storage
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

/// <amd-dependency path="/bower_components/firebase/firebase.js" />
import Alloc = require('../../mem/alloc');
import Config = require('./config');

/**
 * @class Storage
 * @extends Alloc
 */
class Storage extends Alloc {
    
    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * @type Firebase
     * @see Firebase {@link https://www.firebase.com/how-it-works.html}
     * @private
     */
    __firebase__;
    
    /**
     * Initializes an instance of Storage
     * @param {System} sys
     * @param {HTMLElement} [screenEl = <div id="screen" />]
     * @constructor
     */
    constructor(sys) {
    	console.info('[Storage#constructor] Initializing data storage driver...');
    
    	super();
    
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
    get(addr) { }
    
    /**
     * Stores info permanently, returning the size
     * @param {String} addr
     * @param {Any} info
     * @returns {Number}
     * @public
     */
    put(addr, info) {
        console.log('[Storage#put] Adding', info, 'into', addr);
    }

    /**
     * Deletes info from the storage, returning the size
     * @param {String} addr
     * @returns {Number}
     * @public
     */
    delete(addr) {
        console.log('[Storage#delete] Deleging', addr);
    }

    /**
     * Returns the size of the storage
     * @returns {Number}
     * @public
     */
    size() { }

    /**
     * Indicates whether or not there is something that address
     * @param {String} addr
     * @returns {Boolean}
     * @public
     */
    is(addr) { }
    
}

export = Storage;