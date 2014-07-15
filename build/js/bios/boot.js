/**
* @module bios/loader
* @requires bios/config
* @requires bios/bios
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", './config', './bios'], function(require, exports, Config, Bios) {
    /**
    * Booting functionality
    * @namespace Boot
    */
    var Boot;
    (function (Boot) {
        /**
        * Loading element
        * @type HTMLElement
        */
        var loadingEl = Bios.appendHTMLElement(Config.loadingTmpl);

        /**
        * Message element
        * @type HTMLElement
        */
        var txtEl = loadingEl.querySelector('.text');

        /**
        * Cursor element. I need to typecast due to an issue in lib.d.ts
        * @type HTMLElement
        */
        var cursorEl = loadingEl.querySelector('.cursor');

        /**
        * Different cursor modes
        * @enum String
        */
        var CURSOR_MODE = {
            type: 'type',
            blink: 'blink'
        };

        /**
        * Changes the mode of the cursor (type|blink)
        * @param {String} mode
        */
        function cursorMode(mode) {
            console.log('[Boot - cursorMode] Changing cursor mode to', CURSOR_MODE[mode]);

            var clsList = cursorEl.classList;
            clsList.remove(CURSOR_MODE.type);
            clsList.remove(CURSOR_MODE.blink);
            clsList.add(CURSOR_MODE[mode]);
        }

        /**
        * Starts the application
        * @memberof Boot
        */
        function start() {
            console.info('[Boot.start] Starting jscriptcoder.com...');

            cursorMode(CURSOR_MODE.type);

            Bios.print(Config.loadingMsg, txtEl).then(function () {
                console.info('[Promise#then] Starting the system...');

                cursorMode(CURSOR_MODE.blink);

                setTimeout(function () {
                    return require(Config.systemDeps);
                }, Config.delayBeforeLoading);
            });
        }
        Boot.start = start;
    })(Boot || (Boot = {}));

    // Let's kick off the whole thing
    Boot.start();
});
