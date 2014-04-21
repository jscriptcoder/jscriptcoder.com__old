/**
 * Bootstraps the application
 * @module bootstrap
 */

/**
 * @namespace Bootstrap
 */
module Bootstrap {

    /**
     * Loading element
     * @type HTMLElement
     */
    var loading = document.getElementById('loading');

    /**
     * Messaging element
     * @type HTMLElement
     */
    var text: any = loading.querySelector('.text');

    /**
     * Cursor element
     * @type HTMLElement
     */
    var cursor: any = loading.querySelector('.cursor');

    /**
     * Element for easy removal of loading
     * @type HTMLElement
     */
    var parent = loading.parentNode;

    /**
     * Different cursor modes
     * @enum String
     */
    enum TCursorMode {
        type,
        blink
    }

    /**
     * Changes the mode of the cursor (type|blink)
     * @param {String} mode
     */
    function cursorMode(mode) {
        cursor.classList.remove(TCursorMode[TCursorMode.type]);
        cursor.classList.remove(TCursorMode[TCursorMode.blink]);
        cursor.classList.add(TCursorMode[mode]);
    }

    /**
     * Prints a message in the console with typing effect
     * @param {String} message
     * @returns {Promise}
     */
    function print(message) {
        return new Promise((resolve) => {

            cursorMode(TCursorMode.type);

            var msgIdx = 0;
            var interval = setInterval(() => {
                if (message[msgIdx]) {
                    text.innerText += message[msgIdx++];
                } else {
                    clearInterval(interval);
                    cursorMode(TCursorMode.blink);
                    setTimeout(() => resolve(['app']), 2000)
                }
            }, 60);

        });
    }

    /**
     * Starts the app
     * @memberof Boostrap
     */
    export function start() {
        print('Loading terminal. Please wait...')
            .then((deps: string[]) => require(deps, () => parent.removeChild(loading)));
    }
}

// Kicks off the app
Bootstrap.start();
