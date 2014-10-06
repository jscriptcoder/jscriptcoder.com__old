/**
 * Memory allocation
 * @module system/mem/mem
 * @requires system/utils/utils
 * @requires system/mem/alloc
 * @exports Mem
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../utils/utils');
import Alloc = require('./alloc');

/**
 * Allocates memory for the system, programs, etc...
 * @class Mem
 * @extends Alloc
 */
class Mem extends Alloc {
    
    /**
     * @type Object
     * @private
     */
    __storage__;

    /**
     * @type Number
     * @private
     */
    __length__;

    /**
     * Initializes an instance of Mem
     * @constructor
     */
    constructor() {
        console.info('[Mem#constructor] Allocating memory...');
        super();
        
        this.__storage__ = {};
        this.__length__ = 0;
    }

    /**
     * Gets info from the memory
     * @param {String} addr
     * @returns {Any}
     * @public
     */
    get(addr) {
        console.log('[Mem#get] Getting info from', addr);
        
        return addr ? this.__storage__[addr] : void(0);
    }
    
    /**
     * Stores info in memory, returning the size
     * @param {String} addr
     * @param {Any} info
     * @returns {Number}
     * @public
     */
    put(addr, info) {
        console.log('[Mem#put] Adding', info, 'into', addr);

        if (!this.is(addr)) this.__length__++;
        this.__storage__[addr] = info;
        return this.__length__;
    }

    /**
     * Deletes info from memory, returning the size
     * @param {String} addr
     * @returns {Number}
     * @public
     */
    delete(addr) {
        console.log('[Mem#delete] Deleging', addr);
        
        if (this.is(addr)) this.__length__--;
        delete this.__storage__[addr];
        return this.__length__;
    }

    /**
     * Returns the size of taken up memory
     * @returns {Number}
     * @public
     */
    size() { return this.__length__ }

    /**
     * Indicates whether or not there is something that address
     * @param {String} addr
     * @returns {Boolean}
     * @public
     */
    is(addr) { return Utils.isDefined(this.__storage__[addr]) }
    
}

export = Mem;