/**
* @module system/init
* @requires system/system
* @requires apps/shell/shell
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", './system', '../apps/shell/shell'], function(require, exports, System, Shell) {
    /**
    * Contains the system initialization logic
    * @namespace SysInit
    */
    var SysInit;
    (function (SysInit) {
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
        function run() {
            // initializes the system
            system = new System();

            console.log('[SysInit.run] Clearing screen');

            system.interrupt('clearscreen');

            // runs the shell
            shell = new Shell(system);

            console.log('[SysInit.run] System up and running');
        }
        SysInit.run = run;
    })(SysInit || (SysInit = {}));

    // Kicks off the system
    SysInit.run();
});
