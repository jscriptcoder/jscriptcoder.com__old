/**
 * Program lines
 * @module apps/shell/program
 * @requires system/utils
 * @exports Program
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../../system/utils');

/**
 * Keeps track of lines of program. Used when writing blocks {} 
 * or using shift+enter
 * @class Program
 */
class Program {
    
    /**
     * Matches tabs
     * @type RegExp
     * @static
     */
    static TABS_RE = Utils.createRegExp('\t', 'g');
    
    /**
     * Matches open bracket
     * @type RegExp
     * @static
     */
    static BEGIN_BLK = Utils.createRegExp('\{$');
    
    /**
     * Matches closing bracket
     * @type RegExp
     * @static
     */
    static END_BLK = Utils.createRegExp('\}$');
    
    /**
     * @type String[]
     * @private
     */
    __lines__ = [];
    
    /**
     * Keeps track of the current block
     * @type Boolean
     * @private
     */
    __brackets__ = [];
    
    /**
     * Keeps track of the current tab
     * @type Number
     * @private
     */
    __tabs__ = 0;
    
    /**
     * @constructor
     */
    constructor() {
        console.log('[Program#constructor] Instantiating a program...');
    }
    
    /**
     * is getter. Whether or not we have a program
     * @readonly
     * @returns {Boolean}
     * @public
     */
    get is() { return this.__lines__.length }

    /**
     * isBlock getter. Whether or not we are in a block
     * @readonly
     * @returns {Boolean}
     * @public
     */
    get isBlock() { return this.__brackets__.length > 0 }

    /**
     * numTabs getter
     * @readonly
     * @returns {Number}
     * @public
     */
    get numTabs() { return this.__tabs__; }

    /**
     * numLines getter
     * @readonly
     * @returns {Number}
     * @public
     */
    get numLines() { return this.__lines__.length; }

    /**
     * isLastBlock getter. Whether or not we are in the last block
     * @readonly
     * @returns {Boolean}
     * @public
     */
    get isLastBlock() { return this.__brackets__.length === 1 }

    /**
     * Returns the program in one line
     * @returns {String}
     * @public
     */
    get() { return this.__lines__.join('').replace(Program.TABS_RE, '') }

    /**
     * Adds a line to the program
     * @param {String} line
     * @public
     */
    addLine(line) {
        
        var tabMatches = line.match(Program.TABS_RE);

        if (line.match(Program.BEGIN_BLK)) {
            this.__brackets__.push(true);
            this.__tabs__ = (tabMatches ? tabMatches.length : 0) + 1;
        } else {
            this.__tabs__ = tabMatches ? tabMatches.length : 0;
        }
        
        this.__lines__.push(line);
        
        if (line.match(Program.END_BLK)) this.__brackets__.pop()
    }

    /**
     * Clears the program
     * @public
     */
    clear() {
        this.__lines__.length = 0;
        this.__brackets__.length = 0;
        this.__tabs__ = 0;
    }
    
}

export = Program;