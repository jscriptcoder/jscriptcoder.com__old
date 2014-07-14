/**
* Keyboard driver
* @module system/drivers/keyboard/keyboard
* @requires system/utils
* @exports Keyboard
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", '../../utils'], function(require, exports, Utils) {
    /**
    * @class Keyboard
    * @extends DOMWrap
    */
    var Keyboard = (function () {
        /**
        * Initializes an instance of Keyboard
        * @param {System} sys
        * @constructor
        */
        function Keyboard(sys) {
            console.log('[Keyboard#constructor] Initializing keyboard driver...');

            this.__sys__ = sys;
            this.__listen__(sys);
        }
        /**
        * Installs necessary interruption-listeners
        * @param {System} sys
        * @private
        */
        Keyboard.prototype.__listen__ = function (sys) {
            var doc = Utils.doc;

            sys.listen('keypress', this.onKeypress.bind(this), doc);
            sys.listen('keydown', this.onKeydown.bind(this), doc);
        };

        /**
        * Gets triggered on keypress
        * @param {Event} e
        * @event
        */
        Keyboard.prototype.onKeypress = function (e) {
            e.preventDefault();

            if (!e.ctrlKey && !e.altKey) {
                this.__sys__.interrupt('keypress', 'char', Utils.toChar(e.which));
            }
        };

        /**
        * Gets trigger on keydown. Filters out special keys
        * @param {Event} e
        * @event
        */
        Keyboard.prototype.onKeydown = function (e) {
            var sys = this.__sys__;

            switch (e.which) {
                case 8:
                case 46:
                    e.preventDefault();
                    console.log('BACKSPACE/DEL');

                    sys.interrupt('keypress', 'delete', Keyboard.SPECIAL_KEYS[e.which]);

                    break;
                case 9:
                    e.preventDefault();
                    console.log('TAB');

                    sys.interrupt('keypress', 'tab');

                    break;
                case 13:
                    e.preventDefault();
                    console.log('ENTER');

                    sys.interrupt('keypress', 'enter', e.shiftKey);

                    break;
                case 35:
                case 36:
                    e.preventDefault();
                    console.log('HOME/END');

                    sys.interrupt('keypress', 'jump', Keyboard.SPECIAL_KEYS[e.which], e.shiftKey);

                    break;
                case 37:
                case 38:
                case 39:
                case 40:
                    e.preventDefault();
                    console.log('ARROW');

                    sys.interrupt('keypress', 'arrow', Keyboard.SPECIAL_KEYS[e.which], e.shiftKey);

                    break;
                case 67:
                    if (e.ctrlKey) {
                        e.preventDefault();
                        console.log('COPY');
                        sys.interrupt('keypress', 'copy');
                    }

                    break;
            }
        };
        Keyboard.SPECIAL_KEYS = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            46: 'del'
        };
        return Keyboard;
    })();

    
    return Keyboard;
});
