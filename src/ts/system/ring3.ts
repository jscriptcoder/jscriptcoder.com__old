/**
 * @module system/ring3
 * @requires system/ring
 * @exports Ring3
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Ring = require('./ring');

/**
 * Provides all the users with the outter level of privileges and API
 * @class Ring3
 * @extends Ring
 */
class Ring3 extends Ring {
    
    /**
     * @constructor
     */
    constructor(sys) {
    	console.info('[Ring3#constructor] Instantiating...');
    	super(sys);
	}

	
	help() { return 'HELP!!!' }
    
}

export = Ring3;