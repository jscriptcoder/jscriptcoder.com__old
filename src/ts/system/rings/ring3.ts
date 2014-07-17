/**
 * First API level
 * @module system/rings/ring3
 * @requires system/rings/config
 * @requires system/rings/ring
 * @requires system/utils/utils
 * @exports Ring3
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Config = require('./config');
import Ring = require('./ring');
import Utils = require('../utils/utils');

/**
 * Provides all the users with the outter level of privileges and API
 * @class Ring3
 * @extends Ring
 */
class Ring3 extends Ring {
    
    /**
     * @constructor
     * @param {System} sys
     */
    constructor(sys) {
    	console.info('[Ring3#constructor] Instantiating...');
    	super(sys);
	}

	/**
	 * Shows all the available commands for this ring
	 * @returns {String} 
	 * @public
	 */
	help() {
        var priv_re = /^_/, info = [], member;
        
        info = info.concat(Config.help.header);
        
        // loops over all the members, except constructor and private ones
        for(member in this) {
            if (member !== 'constructor' && !member.match(priv_re)) {
                info.push(member + '()');
            }
        }
        
        return info;
    }

	/**
	 * Clears up the screen emptying the output
	 * @param {String} [arg]
	 * @public
	 */
	clear(arg) {
        if (arg === '-h') return Config.help.clear;
        this.__sys__.interrupt('clearoutput');
    }
    
}

export = Ring3;