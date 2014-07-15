/**
* @module system/ring
* @exports Ring
* @requires system/mem
* @requires system/utils
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", './mem', './utils'], function(require, exports, Mem, Utils) {
    /**
    * Basic functionality to be inherited by the rings API
    * @class Ring
    */
    var Ring = (function () {
        /**
        * @constructor
        */
        function Ring(sys) {
            console.info('[Ring#constructor] Instantiating...');
            this.__sys__ = sys;
            this.__listen__(sys);
        }
        /**
        * Installs necessary interruption-listeners
        * @param {System} sys
        * @private
        */
        Ring.prototype.__listen__ = function (sys) {
            sys.listen('command', this.__onCommand__.bind(this));
        };

        /**
        * Gets trigger when a command is being sent to the ring
        * @param {String} cmd
        * @event
        */
        Ring.prototype.__onCommand__ = function (cmd) {
            var _this = this;
            Utils.async(function () {
                var ret, win = Utils.win, e = win['eval'];

                // we put the instance in the global scope since the evaluation will take place there
                win['__ring__'] = _this;

                try  {
                    // the magic happens here ;-)
                    ret = e('with(__ring__) { ' + cmd + ' }');
                    if (typeof ret !== 'undefined')
                        _this.__sys__.interrupt('output', ret + '', 'result');
                } catch (e) {
                    console.warn('[Ring#__onCommand__] Error:', e);
                    _this.__sys__.interrupt('output', e.toString(), 'error');
                }

                // we no longer need this temporal variable
                delete win['__ring__'];
            });
        };
        Ring.mem = new Mem();
        return Ring;
    })();

    
    return Ring;
});
