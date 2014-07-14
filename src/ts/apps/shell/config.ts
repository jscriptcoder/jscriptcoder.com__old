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
 * @type String[]
 */
export var msgHeader = [
    '/**',
    ' * The adventure begins here. Type <strong>help()</strong> to see the available commands...',
    ' * Remember, this is all about coding in JavaScript, and you\'ll discover an amazing world ;-)',
    ' *',
    ' * <strong>@author</strong> Francisco Ramos <<a href="mailto:fran@jscriptcoder.com">fran@jscriptcoder.com</a>>',
    ' * <strong>@version</strong> 0.1.0',
    ' * <strong>@see</strong> <a href="https://github.com/jscriptcoder/jscriptcoder.com" target="_blank">GitHub</a>',
    ' * <strong>@see</strong> <a href="https://codio.com/jscriptcoder/jscriptcoder-com/" target="_blank">Codio.com</a>',
    ' */',
    ' '
];

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