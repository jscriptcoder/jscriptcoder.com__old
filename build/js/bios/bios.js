/**
* @module bios/bios
* @requires bios/config
* @exports Bios
*/
define(["require", "exports", './config'], function(require, exports, Config) {
    /**
    * Basic input/output functionality
    * @namespace Bios
    */
    var Bios;
    (function (Bios) {
        /**
        * Document API
        * @type HTMLElement
        */
        var doc = document;

        /**
        * Screen devide by default
        * @type HTMLElement
        */
        var screenEl = doc.getElementById(Config.screenElemId) || doc.body;

        /**
        * Creates DOM elements
        * @param {String} html
        * @returns {HTMLElement}
        */
        function createHTMLElement(html) {
            console.log('[Bios - createHTMLElement] Creating element:', html);

            var div = doc.createElement('div');
            div.innerHTML = html;
            return div.children[0];
        }

        /**
        * Creates and append a new DOM element to another element
        * @param {String} html
        * @param {HTMLElement} [appendTo = screen]
        * @returns {HTMLElement}
        * @memberof Bios
        */
        function appendHTMLElement(html, appendTo) {
            if (typeof appendTo === "undefined") { appendTo = screenEl; }
            var el = createHTMLElement(html);
            appendTo.appendChild(el);
            return el;
        }
        Bios.appendHTMLElement = appendHTMLElement;

        /**
        * Prints a message in the screen with typing effect
        * @param {String} message
        * @param {HTMLElement} [el = <div/>]
        * @returns {Promise}
        * @memberof Bios
        */
        function print(message, el) {
            console.log('[Bios.start] Printing message:', message);

            if (!el)
                el = appendHTMLElement('<div>');

            return new Promise(function (resolve) {
                var msgIdx = 0, interval;

                el.innerHTML = '';

                interval = setInterval(function () {
                    if (message[msgIdx]) {
                        el.innerHTML += message[msgIdx++];
                    } else {
                        clearInterval(interval);
                        resolve(true);
                    }
                }, Config.typingSpeedDelay);
            });
        }
        Bios.print = print;
    })(Bios || (Bios = {}));

    
    return Bios;
});
