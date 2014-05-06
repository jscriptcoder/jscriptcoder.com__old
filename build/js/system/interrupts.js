/**
* Implementes, or rather emulate, interruptions functionality
* @module @module system/interrupts
* @requires system/utils
* @requires system/mem
* @exports Interrupts
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", './utils', './mem'], function(require, exports, Utils, Mem) {
    /**
    * Provides a basic pubsub pattern for communication between drivers and apps
    * @class Interrupts
    */
    var Interrupts = (function () {
        /**
        * @constructor
        */
        function Interrupts() {
            this.__table__ = this.__allocateMem__();
        }
        /**
        * Allocates memory for the interruptions
        * @returns {Mem}
        * @private
        */
        Interrupts.prototype.__allocateMem__ = function () {
            return new Mem();
        };

        /**
        * Listens to interruptions
        * @param {String} type
        * @param {Function} handler
        * @param {Any} [context = null]
        * @public
        */
        Interrupts.prototype.listen = function (type, handler, context) {
            if (typeof context === "undefined") { context = null; }
            if (Utils.isHTMLElement(context)) {
                // for document and other HTMLElement events
                context.addEventListener(type, handler);
            } else {
                var table = this.__table__, ints;

                if (!table.is(type)) {
                    table.put(type, ints = []);
                } else {
                    ints = table.get(type);
                }

                ints.push({ handler: handler, context: context });
            }
        };

        /**
        * Triggers the interruption
        * @param {String}
        * @param {Any[]} args
        * @public
        */
        Interrupts.prototype.interrupt = function (type) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var ints = this.__table__.get(type);
            if (Utils.isArray(ints)) {
                ints.forEach(function (int) {
                    return int.handler.apply(int.context, args);
                });
            }
        };

        /**
        * Stops listening to the interruptions for that type
        * @param {String} type
        * @param {Function} [handler]
        * @param {Any} [context]
        * @public
        */
        Interrupts.prototype.unlisten = function (type, handler, context) {
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
                    var newInts = ints.filter(function (int, i) {
                        return int.handler !== handler;
                    });
                    this.__table__.put(type, newInts);
                }
            }
        };
        return Interrupts;
    })();

    
    return Interrupts;
});
