/**
* @module system/init
* @requires system/system
* @requires apps/terminal/terminal
*/
define(["require", "exports", './system', '../apps/terminal/terminal'], function(require, exports, System, Terminal) {
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
        * @type Terminal
        */
        var terminal;

        /**
        * Runs the system
        * @memberof SysInit
        */
        function run() {
            system = new System();

            console.log('[SysInit.run] Clearing screen');

            system.clear();

            terminal = new Terminal(system);

            console.log('[SysInit.run] System up and running');
        }
        SysInit.run = run;
    })(SysInit || (SysInit = {}));

    // Kicks off the system
    SysInit.run();
});
