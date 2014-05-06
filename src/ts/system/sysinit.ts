/**
 * @module system/init
 * @requires system/system
 * @requires apps/shell/shell
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import System = require('./system');
import Shell = require('../apps/shell/shell');

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
     * @type Shell
     */
    var shell;

    /**
     * Runs the system
     * @memberof SysInit
     */
    export function run() {
        
        // initializes the system
        system = new System();
        
        console.log('[SysInit.run] Clearing screen');
        
        system.clearScreen();
        
        // runs the shell
        
        shell = new Shell(system);
        
        console.log('[SysInit.run] System up and running');
        
    }
    
}

// Kicks off the system
SysInit.run();