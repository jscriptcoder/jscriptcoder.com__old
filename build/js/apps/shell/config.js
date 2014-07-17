/**
* This module provides configuration items for the shell
* @module apps/shell/config
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports"], function(require, exports) {
    /**
    * Symbol shown in the prompt: js>
    * @type String
    */
    exports.symbol = 'js&gt;&nbsp;';

    /**
    * @type String
    */
    exports.template = [
        '<div id="shell" class="shell">',
        '<div class="output"></div>',
        '<div class="prompt">',
        '<span class="symbol">' + exports.symbol + '</span><span class="input"><span class="cursor blink">&nbsp;</span></span>',
        '</div>',
        '</div>'
    ].join('');

    /**
    * @type String[]
    */
    exports.msgHeader = [
        '/**',
        '&nbsp;* The adventure begins here. Type <i>help()</i> to see the available commands...',
        '&nbsp;* Remember, this is all about coding in JavaScript, and you\'ll discover an amazing world ;-)',
        '&nbsp;*',
        '&nbsp;* <strong>@author</strong> <i>Francisco Ramos <<a href="mailto:fran@jscriptcoder.com">fran@jscriptcoder.com</a>></i>',
        '&nbsp;* <strong>@version</strong> <i>0.1.0</i>',
        '&nbsp;* <strong>@see</strong> <i><a href="https://github.com/jscriptcoder/jscriptcoder.com" target="_blank">GitHub</a></i>',
        '&nbsp;* <strong>@see</strong> <i><a href="https://codio.com/jscriptcoder/jscriptcoder-com/" target="_blank">Codio.com</a></i>',
        '&nbsp;*/',
        '&nbsp;'
    ];

    /**
    * @type String
    */
    exports.outputSel = '.output';

    /**
    * @type String
    */
    exports.promptSel = '.prompt';

    /**
    * @type String
    */
    exports.symbolSel = '.symbol';

    /**
    * @type String
    */
    exports.inputSel = '.input';

    /**
    * @type String
    */
    exports.cursorSel = '.cursor';

    /**
    * @type Number
    */
    exports.historyLimit = 50;

    /**
    * @type String
    */
    exports.tab = '    ';
});
