/**
 * @module system/init
 * @requires system/system
 * @requires apps/terminal/terminal
 */

import System = require('./system');
import Terminal = require('../apps/terminal/terminal');

/**
 * Contains the system initialization logic
 * @namespace SysInit
 */
module SysInit {

    /**
     * @type System
     */
    var system;
    
    /**
     * @type Terminal
     */
    var terminal;

    /**
     * Runs the system
     * @memberof SysInit
     */
    export function run() {
        
        system = new System();
        
        console.log('[SysInit.run] Clearing screen');
        
        system.clear();
        
        terminal = new Terminal(system);
        
        console.log('[SysInit.run] System up and running');
        
    }
    
}

// Kicks off the system
SysInit.run();