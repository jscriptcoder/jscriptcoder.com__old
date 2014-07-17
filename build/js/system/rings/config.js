/**
* This module provides configuration items for the rings
* @module system/rings/config
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports"], function(require, exports) {
    /**
    * @type Object
    */
    exports.help = {
        header: [
            '/**',
            '&nbsp;* List of commands',
            '&nbsp;* Pass <i>"-h"</i> as a parameter in any command for more help',
            '&nbsp;* <strong>@example</strong> <i>command("-h")</i>',
            '&nbsp;*/'
        ],
        clear: [
            '/**',
            '&nbsp;* Clears up the screen',
            '&nbsp;* <strong>@example</strong> <i>clear()</i>',
            '&nbsp;*/'
        ]
    };
});
