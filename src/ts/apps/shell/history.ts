/**
 * Input history
 * @module apps/shell/history
 * @requires system/mem
 * @requires system/utils
 * @requires apps/shell/config
 * @exports History
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Mem = require('../../system/mem');
import Utils = require('../../system/utils');
import Config = require('./config');

/**
 * Keeps track of a history of commands. Yes I know, pointless stuff. 
 * I should use an array instead of an object/hashtable for this purpose
 * @class History
 * @extends Mem
 */
class History extends Mem {
    
    /**
     * Prefix used to address the command in memory
     * @type String
     * @static
     */
    static prefix = 'CMD_';
    
    /**
     * List of addressses
     * @type String[]
     * @private
     */
    __addrs__;
    
    /**
     * Pointer to the current cmd
     * @type Number
     * @private
     */
    __index__;
    
    /**
     * Initializes an instance of History
     * @param {HTMLElement} el
     * @param {System} shell
     * @param {HTMLElement} kpEl
     * @constructor
     */
    constructor() {
        console.log('[History#constructor] Initializing History memory...');
        super();
    
        this.__addrs__ = [];
    }

    /**
     * index getter
     * @readonly
     * @returns {Number}
     * @public
     */
    get index() {
        return this.__index__;
    }

    /**
     * Gets a command in that index
     * @param {Number} [index = this.index]
     * @return {Any}
     * @public
     */
    get(idx = this.index) {
        super.get(this.__addrs__[idx]);
    }

    /**
     * Gets next command
     * @returns {Any}
     * @public
     */
    next() {
        var idx = this.__index__, limit = this.__addrs__.length - 1;
        this.__index__ = idx < limit ? idx + 1 : limit;
        return this.get();
    }
    
    /**
     * Gets previous command
     * @returns {Any}
     * @public
     */
    previous() {
        var idx = this.__index__;
        this.__index__ = idx > 0 ? idx - 1 : 0;
        return this.get();
    }

    /**
     * Adds a new command to the list
     * @param {String} cmd
     * @return {Number}
     * @public
     */
    add(cmd) {
        // we skip the storing if the string is empty
        if (Utils.isString(cmd) && !cmd) return;
        
        var addr = Utils.uid(History.prefix);
        this.put(addr, cmd);
        this.__addrs__.push(addr);
        
        if (Config.historyLimit < this.size()) {
            // we have surpassed the limit, let's delete the first command from the history
            addr = this.__addrs__.shift();
            this.delete(addr);
        }
        
        this.__index__ = this.__addrs__.length - 1;
        return this.__addrs__.length;
    }

}

export = History;