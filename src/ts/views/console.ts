/**
 * @module views/console
 * @requires Backbone
 * @exports Console
 */

import Backbone = require('backbone');

/**
 * @class Console
 * @extends Backbone.View
 */
class Console extends Backbone.View {

    /**
     * Holds a reference to the DOM element
     * @type {HTMLElement}
     */
    el = document.getElementById('console');

    /**
     * Clears the console
     * @public
     */
    clear() { this.el.innerHTML = '' }
};

export = Console;