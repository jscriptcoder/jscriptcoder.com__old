/**
 * Implementes, or rather emulate, interruptions functionality
 * @module @module system/interrupts
 * @requires system/utils
 * @requires system/mem
 * @exports Interrupts
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('./utils');
import Mem = require('./mem');

/**
 * Provides a basic pubsub pattern for communication between drivers and apps
 * @class Interrupts
 */
class Interrupts {
    
    /**
     * Stores lists of interruptions
     * @type Mem
     * @private
     */
    __table__;
    
    /**
     * @constructor
     */
    constructor() {
        this.__table__ = this.__allocateMem__();
    }

    /**
     * Allocates memory for the interruptions
     * @returns {Mem}
     * @private
     */
    __allocateMem__() {
        return new Mem();
    }

    /**
     * Listens to interruptions
     * @param {String} type
     * @param {Function} handler
     * @param {Any} [context = null]
     * @public
     */
    listen(type, handler, context = null) {
        if (Utils.isHTMLElement(context)) {
            // for document and other HTMLElement events
            context.addEventListener(type, handler);
        } else {
            var table = this.__table__, ints;
            
            if (!table.is(type)) {
                table.put(type,  ints = []);
            } else {
                ints = table.get(type);
            }
            
            ints.push({ handler: handler, context: context });   
        }
    }
    
    /**
     * Triggers the interruption
     * @param {String}
     * @param {Any[]} args
     * @public
     */
    interrupt(type, ...args) {
        var ints = this.__table__.get(type);
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
        var ints = this.__table__.get(type), idx;
             
        if (Utils.isHTMLElement(context)) {
            // for document and other HTMLElements
            context.removeEventListener(type, handler);
        } else {
             
            if (!handler) {
                // deletes all the inturrpuptions for this type
                this.__table__.delete(type);
            } else if (Utils.isArray(ints)) {
             
                // deletes the interruption with that handler
                var newInts = ints.filter((int, i) => int.handler !== handler);
                this.__table__.put(type, newInts);
             
            }
             
        }
             
    }
    
}

export = Interrupts;