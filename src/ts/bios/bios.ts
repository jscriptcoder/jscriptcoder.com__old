/**
 * @module bios/bios
 * @requires bios/config
 * @exports Bios
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Config = require('./config');

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
    export function appendHTMLElement(html, appendTo = screenEl) {
        var el = createHTMLElement(html);
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
        
        if (!el) el = appendHTMLElement('<div>');
        
        return new Promise((resolve) => {
            
            var msgIdx = 0, interval;

            el.innerHTML = '';
            
            interval = setInterval(() => {
                if (message[msgIdx]) {
                    el.innerHTML += message[msgIdx++];
                } else {
                    clearInterval(interval);
                    resolve(true);
                }
            }, Config.typingSpeedDelay);

        });
    }
    
}

export = Bios;