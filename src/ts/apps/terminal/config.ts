/**
 * This module provides configuration items for the app
 * @module terminconf
 */

/**
 * @type String
 */
export var template = [
    '<div id="terminal">',
        '<div class="output"></div>',
        '<div class="prompt">',
            '<span class="symbol">js&gt;&nbsp;</span><span class="input"></span><span class="cursor blink">&nbsp;</span>',
        '</div>',
    '</div>'
].join('');

/**
 * @type String[]
 */
export var msgHeader = [
    '/**',
    ' * The adventure begins in here. Type <strong>help()</strong> to see the available commands...',
    ' * Remember, this is all about coding in JavaScript, and you\'ll discover an amazing world ;-)',
    ' *',
    ' * <strong>@author</strong> Francisco Ramos <<a href="mailto:fran@jscriptcoder.com">fran@jscriptcoder.com</a>>',
    ' * <strong>@version</strong> 0.1.0',
    ' * <strong>@see</strong> <a href="https://github.com/jscriptcoder/jscriptcoder.com">GitHub</a>',
    ' * <strong>@see</strong> <a href="https://codio.com/jscriptcoder/jscriptcoder-com/">Codio.com</a>',
    ' */',
    ' '
];