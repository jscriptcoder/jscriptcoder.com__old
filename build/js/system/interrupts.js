/**
* Implementes, or rather emulate, interruptions functionality
* @module @module system/interrupts
* @requires system/utils
* @exports Interrupts
*/
define(["require", "exports", './utils'], function(require, exports, Utils) {
    /**
    * Provides a basic pubsub pattern for communication between drivers and apps
    * @class Interrupts
    */
    var Interrupts = (function () {
        /**
        * @constructor
        */
        function Interrupts() {
            this.__ints__ = {};
        }
        /**
        * Listens to interruptions
        * @param {String} type
        * @param {Function} handler
        * @param {Any} [context = null]
        * @public
        */
        Interrupts.prototype.listen = function (type, handler, context) {
            if (typeof context === "undefined") { context = null; }
            if (Utils.isDOMElement(context)) {
                // for document and other HTMLElement events
                context.addEventListener(type, handler);
            } else {
                this.__ints__[type] = this.__ints__[type] || [];
                this.__ints__[type].push({ handler: handler, context: context });
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
            var ints = this.__ints__[type];
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
                    this.__ints__[type] = ints.filter(function (int, i) {
                        return int.handler !== handler;
                    });
                }
            }
        };
        return Interrupts;
    })();

    
    return Interrupts;
});
