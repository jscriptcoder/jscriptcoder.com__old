/**
 * Implementes, or rather emulate, interruptions functionality
 * @module @module system/interrupts
 * @requires system/utils
 * @exports Interrupts
 */

import Utils = require('./utils');

/**
 * Provides a basic pubsub pattern for communication between drivers and apps
 * @class Interrupts
 */
class Interrupts {
    
    /**
     * Stores the list of interruptions
     * @type Object
     * @private
     */
    __ints__;
    
    /**
     * @constructor
     */
    constructor() {
        this.__ints__ = {};
    }
    
    /**
     * Listens to interruptions
     * @param {String} type
     * @param {Function} handler
     * @param {Any} [context = null]
     * @public
     */
    listen(type, handler, context = null) {
        if (Utils.isDOMElement(context)) {
            // for document and other HTMLElement events
            context.addEventListener(type, handler);
        } else {
            this.__ints__[type] = this.__ints__[type] || [];
            this.__ints__[type].push({ handler: handler, context: context });   
        }
    }
    
    /**
     * Triggers the interruption
     * @param {String}
     * @param {Any[]} args
     * @public
     */
    interrupt(type, ...args) {
        var ints = this.__ints__[type];
        if (Utils.isArray(ints)) {
            ints.forEach((int) => int.handler.apply(int.context, args));
        }
    }

    /**
     * Stops listening to the interruptions for that type
     * @param {String} type
     * @param {Function} [handler]
     * @param {Any} [context]
     * @public
     */
    unlisten(type, handler?, context?) {
        var ints = this.__ints__[type], idx;
             
        if (Utils.isDOMElement(context)) {
            // for document and other HTMLElements
            context.removeEventListener(type, handler);
        } else {
             
            if (!handler) {
                // deletes all the inturrpuptions for this type
                delete this.__ints__[type];
            } else if (Utils.isArray(ints)) {
                // deletes the interruption with that handler
                this.__ints__[type] = ints.filter((int, i) => int.handler !== handler);
            }
             
        }
             
    }
    
}

export = Interrupts;