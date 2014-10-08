/**
 * This module provides configuration items for the shell
 * @module apps/shell/config
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

/**
 * Symbol shown in the prompt: js>
 * @type String
 */
export var symbol = 'js&gt;&nbsp;';

/**
 * @type String
 */
export var template = [
    '<div id="shell" class="shell">',
        '<div class="output"></div>',
        '<div class="prompt">',
            '<span class="symbol">' + symbol + '</span><span class="input"><span class="cursor blink">&nbsp;</span></span>',
        '</div>',
    '</div>'
].join('');

/**
 * @type String
 */
export var outputSel = '.output';

/**
 * @type String
 */
export var promptSel = '.prompt';

/**
 * @type String
 */
export var symbolSel = '.symbol';

/**
 * @type String
 */
export var inputSel = '.input';

/**
 * @type String
 */
export var cursorSel = '.cursor';

/**
 * @type Number
 */
export var historyLimit = 50;

/**
 * @type String
 */
export var tab = '    ';