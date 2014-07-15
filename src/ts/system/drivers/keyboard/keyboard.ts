/**
 * Keyboard driver
 * @module system/drivers/keyboard/keyboard
 * @requires system/utils
 * @exports Keyboard
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../../utils');

/**
 * @class Keyboard
 * @extends DOMWrap
 */
class Keyboard {
    
    /**
     * Map of special keys
     * @enum String
     * @static
     */
    static SPECIAL_KEYS = {
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
    
    /**
     * @type System
     * @private
     */
    __sys__;
    
    /**
     * Initializes an instance of Keyboard
     * @param {System} sys
     * @constructor
     */
    constructor(sys) {
        console.info('[Keyboard#constructor] Initializing keyboard driver...');
        
        this.__sys__ = sys;
        this.__listen__(sys);

    }

    /**
     * Installs necessary interruption-listeners
     * @param {System} sys
     * @private
     */
	__listen__(sys) {
        var doc = Utils.doc;
        
        sys.listen('keypress', this.onKeypress.bind(this), doc);
        sys.listen('keydown', this.onKeydown.bind(this), doc);
    }

    /**
     * Gets triggered on keypress
     * @param {Event} e
     * @event
     */
    onKeypress(e) {
        e.preventDefault();
        
        if (!e.ctrlKey && !e.altKey) {
            this.__sys__.interrupt('keypress', 'char', Utils.toChar(e.which));
        }

    }

    /**
     * Gets trigger on keydown. Filters out special keys
     * @param {Event} e
     * @event
     */
    onKeydown(e) {
        var sys = this.__sys__;
        
        switch(e.which) {
            case 8: // BACKSPACE
            case 46: // DEL
                e.preventDefault();
                console.log('BACKSPACE/DEL');
                
                sys.interrupt('keypress', 'delete', Keyboard.SPECIAL_KEYS[e.which]);
                
                break;
            case 9: // TAB
                e.preventDefault();
                console.log('TAB');
                
                sys.interrupt('keypress', 'tab');
                
                break;
            case 13: // ENTER
                e.preventDefault();
                console.log('ENTER');
                
                sys.interrupt('keypress', 'enter', e.shiftKey);
                
                break;
            case 35: // END
            case 36: // HOME
                e.preventDefault();
                console.log('HOME/END');
                
                sys.interrupt('keypress', 'jump', Keyboard.SPECIAL_KEYS[e.which], e.shiftKey);
                
                break;
            case 37: // LEFT
            case 38: // UP
            case 39: // RIGHT
            case 40: // DOWN
                e.preventDefault();
                console.log('ARROW');
                
                sys.interrupt('keypress', 'arrow', Keyboard.SPECIAL_KEYS[e.which], e.shiftKey);
                
                break;
            case 67: // C
                if (e.ctrlKey) {
                    e.preventDefault();
                    console.log('COPY');
                    sys.interrupt('keypress', 'copy');
                }
                
                break;
            
        }
        
    }

}

export = Keyboard;