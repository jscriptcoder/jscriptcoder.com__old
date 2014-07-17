/**
 * Base class that needs to be extended
 * @module system/rings/ring
 * @exports Ring
 * @requires system/mem/mem
 * @requires system/utils/utils
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Mem = require('../mem/mem');
import Utils = require('../utils/utils');

/**
 * Basic functionality to be inherited by the rings API
 * @class Ring
 */
class Ring {
    
    /**
     * Memory allocation for the rings. It'll be shared by all of them
     * @type Mem
     * @static
     */
    static mem = new Mem();
    
    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * @constructor
     */
    constructor(sys) {
        console.info('[Ring#constructor] Instantiating...');
    	this.__sys__ = sys;
    	this.__listen__(sys);
    }

    /**
     * Installs necessary interruption-listeners
     * @param {System} sys
     * @private
     */
	__listen__(sys) { sys.listen('command', this.__onCommand__.bind(this)) }

    /**
     * Gets trigger when a command is being sent to the ring
     * @param {String} cmd
     * @event
     */
    __onCommand__(cmd) {

        Utils.async(() => {
            var ret, 
                win = Utils.win,
                e = win['eval']; // indirect eval call, eval'ing in global scope

            // we put the instance in the global scope since the evaluation will take place there
            win['__ring__'] = this;

			try {
				// the magic happens here ;-)
            	ret = e('with(__ring__) { ' + cmd + ' }');
            	if (typeof ret !== 'undefined') this.__sys__.interrupt('output', ret, 'result');
			} catch (e) {
        		console.warn('[Ring#__onCommand__] Error:', e);
        		this.__sys__.interrupt('output', e.toString(), 'error');
        	}

			// we no longer need this temporal variable
			delete win['__ring__'];

		});


    }
    
}

export = Ring;