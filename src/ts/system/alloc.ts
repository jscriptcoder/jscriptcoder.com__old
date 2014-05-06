/**
 * @module system/alloc
 * @exports Alloc
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

/**
 * Abstract class that provides the basic methods for allocation of storage
 * @lcass Alloc
 */
class Alloc {

    /**
     * Gets info from the storate device
     * @param {String} addr
     * @returns {Any}
     * @abstract
     */
    get(addr) { throw Error('Implement this method') }
    
    /**
     * Stores info in the storate device
     * @param {String} addr
     * @param {Any} info
     * @abstract
     */
    put(addr, info) { throw Error('Implement this method') }

    /**
     * Deletes info from the storate device
     * @abstract
     */
    delete(key) { throw Error('Implement this method') }

    /**
     * Returns the size of the storage
     * @returns {Number}
     * @abstract
     */
    size() { throw Error('Implement this method') }

    /**
     * Indicates whether or not there is something in there
     * @param {String} addr
     * @returns {Boolean}
     * @abstract
     */
    is(addr) { throw Error('Implement this method') }
    
}

export = Alloc;