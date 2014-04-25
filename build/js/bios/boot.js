/**
* @module bios/loader
* @requires bios/bios
* @requires bios/config
*/
define(["require", "exports", './bios', './config'], function(require, exports, Bios, Config) {
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
        var loadingEl = Bios.appendDOMElement(Config.loadingTmpl);

        /**
        * Message element
        * @type HTMLElement
        */
        var txtEl = loadingEl.querySelector('.text');

        /**
        * Cursor element
        * I need to typecast due to an issue in lib.d.ts
        * @type HTMLElement
        */
        var cursorEl = loadingEl.querySelector('.cursor');

        /**
        * Different cursor modes
        * @enum String
        */
        var TCursorMode;
        (function (TCursorMode) {
            TCursorMode[TCursorMode["type"] = 0] = "type";
            TCursorMode[TCursorMode["blink"] = 1] = "blink";
        })(TCursorMode || (TCursorMode = {}));
        ;

        /**
        * Changes the mode of the cursor (type|blink)
        * @param {String} mode
        */
        function cursorMode(mode) {
            console.log('[Boot - cursorMode] Changing cursor mode to', TCursorMode[mode]);

            var clsList = cursorEl.classList;
            clsList.remove(TCursorMode[0 /* type */]);
            clsList.remove(TCursorMode[1 /* blink */]);
            clsList.add(TCursorMode[mode]);
        }

        /**
        * Starts the application
        * @memberof Boot
        */
        function start() {
            console.log('[Boot.start] Starting jscriptcoder.com...');

            cursorMode(0 /* type */);

            Bios.print(Config.loadingMsg, txtEl).then(function () {
                console.log('[Promise#then] Starting the system...');

                cursorMode(1 /* blink */);

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
