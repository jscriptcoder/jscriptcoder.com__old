/**
 * Keyboard driver
 * @module system/drivers/keyboard/keyboard
 * @exports Keyboard
 */

/**
 * @class Keyboard
 * @extends DOMWrap
 */
class Keyboard {
    
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
        console.log('[Keyboard#constructor] Initializing keyboard driver...');
        this.__sys__ = sys;
    }

    /**
     * Gets triggered on keypress
     * @event
     * @param {Event} e
     */
    onKeypress(e) {
        e.preventDefault();
        
        if (!e.ctrlKey && !e.altKey) {
            this.__sys__.interrupt('keypress', 'char', String.fromCharCode(e.which));
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
                
                sys.interrupt('keypress', 'delete', {
                    8: 'backspace',
                    46: 'del',
                }[e.which]);
                
                break;
            case 9: // TAB
                e.preventDefault();
                console.log('TAB');
                
                sys.interrupt('keypress', 'tab');
                
                break;
            case 13: // ENTER
                e.preventDefault();
                console.log('ENTER');
                
                sys.interrupt('keypress', 'enter');
                
                break;
            case 35: // END
            case 36: // HOME
                e.preventDefault();
                console.log('HOME/END');
                
                sys.interrupt('keypress', 'jump', {
                    35: 'end',
                    36: 'home'
                }[e.which]);
                
                break;
            case 37: // LEFT
            case 38: // UP
            case 39: // RIGHT
            case 40: // DOWN
                e.preventDefault();
                console.log('ARROW');
                
                sys.interrupt('keypress', 'arrow', {
                    37: 'left',
                    38: 'up',
                    39: 'right',
                    40: 'down'
                }[e.which]);
                
                break;
            case 67: // C
            case 86: // V
                if (e.ctrlKey) {
                    e.preventDefault();
                    console.log('COPY/PASTE');
                }
                
                break;
            
        }
        
    }

}

export = Keyboard;