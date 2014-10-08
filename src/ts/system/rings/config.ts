/**
 * This module provides configuration items for the rings
 * @module system/rings/config
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */


/**
 * @type Object
 */
export var help = {
    
    header: [
        '/**',
        '&nbsp;* List of available commands for depending on your privileges.',
        '&nbsp;* Pass <i>"-h"</i> as a parameter in any command for more help',
        '&nbsp;* <strong>@example</strong> <i>command("-h");</i>',
        '&nbsp;*/'
    ],
    
    clear: [
        '/**',
        '&nbsp;* Clears up the screen',
        '&nbsp;* <strong>@example</strong> <i>clear();</i>',
        '&nbsp;*/'
    ],

    about: [
        '/**',
        '&nbsp;* Shows information about this app.',
        '&nbsp;* If the string <i>"author"</i> is passed in, it\'ll show info about the author',
        '&nbsp;* <strong>@param</strong> {<i>string</i>} [<strong>what</strong>] - Optional parameter. Values: <i>"author"</i>',
        '&nbsp;* <strong>@example</strong> <i>about();</i> // prints info about this app',
        '&nbsp;* <strong>@example</strong> <i>about("author");</i> // prints info about me :-)',
        '&nbsp;*/'
    ]
    
}