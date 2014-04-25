/**
 * @module bios/bios
 * @exports Bios
 */


/**
 * Basic input/output functionality
 * @namespace Bios
 */
module Bios {

    /**
     * Document API
     * @type HTMLElement
     */
    var doc = document;
    
    /**
     * @type Number
     */
    var typingSpeedDelay = 60; // ms
    
    /**
     * Screen devide by default
     * @type HTMLElement
     */
    var screen = doc.getElementById('screen') || document.body;
    
    /**
     * Creates DOM elements
     * @param {String} html
     * @returns {HTMLElement}
     */
    function createDOMElement(html) {
        
        console.log('[Bios - createDOMElement] Creating DOM:', html);
        
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
    export function appendDOMElement(html, appendTo = screen) {
        
        var el = createDOMElement(html);
        appendTo.appendChild(el);
        return el;
    }
        
    /**
     * Prints a message in the screen with typing effect
     * @param {String} message
     * @param {HTMLElement} [el = <div/>]
     * @returns {Promise}
     * @memberof Bios
     */
    export function print(message, el?) {
        
        console.log('[Bios.start] Printing message:', message);
        
        if (!el) el = appendDOMElement('<div>');
        
        return new Promise((resolve) => {
            
            var msgIdx = 0, interval;

            interval = setInterval(() => {
                if (message[msgIdx]) {
                    el.innerText += message[msgIdx++];
                } else {
                    clearInterval(interval);
                    resolve(true);
                }
            }, typingSpeedDelay);

        });
    }
    
}

export = Bios;