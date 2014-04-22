/**
* Bootstraps the application
* @module bootstrap
*/
/**
* @namespace Bootstrap
*/
var Bootstrap;
(function (Bootstrap) {
    /**
    * Loading element
    * @type HTMLElement
    */
    var loading = document.getElementById('loading');

    /**
    * Messaging element
    * @type HTMLElement
    */
    var text = loading.querySelector('.text');

    /**
    * Cursor element
    * @type HTMLElement
    */
    var cursor = loading.querySelector('.cursor');

    /**
    * Element for easy removal of loading
    * @type HTMLElement
    */
    var parent = loading.parentNode;

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
        var clsList = cursor.classList;
        clsList.remove(TCursorMode[0 /* type */]);
        clsList.remove(TCursorMode[1 /* blink */]);
        clsList.add(TCursorMode[mode]);
    }

    /**
    * Prints a message in the console with typing effect
    * @param {String} message
    * @returns {Promise}
    */
    function print(message) {
        return new Promise(function (resolve) {
            var msgIdx = 0, interval;

            cursorMode(0 /* type */);

            interval = setInterval(function () {
                if (message[msgIdx]) {
                    text.innerText += message[msgIdx++];
                } else {
                    clearInterval(interval);
                    cursorMode(1 /* blink */);
                    setTimeout(function () {
                        return resolve(['app']);
                    }, 3000);
                }
            }, 60);
        });
    }

    /**
    * Starts the app
    * @memberof Boostrap
    */
    function start() {
        print('Loading terminal. Please wait...').then(function (deps) {
            return require(deps, function () {
                return parent.removeChild(loading);
            });
        });
    }
    Bootstrap.start = start;
})(Bootstrap || (Bootstrap = {}));

// Kicks off the app
Bootstrap.start();
