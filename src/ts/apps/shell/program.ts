/**
 * Program lines
 * @module apps/shell/program
 * @requires system/utils
 * @requires apps/shell/config
 * @exports Program
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../../system/utils');
import Config = require('./config');

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
    static INIT_SPACES_RE = Utils.createRegExp('^\\s+');
    
    /**
     * Matches tabs
     * @type RegExp
     * @static
     */
    static TABS_RE = Utils.createRegExp('\\s{' + Config.tab.length + '}', 'g');
    
    /**
     * Matches open bracket
     * @type RegExp
     * @static
     */
    static BEGIN_BLK_RE = Utils.createRegExp('\\{$');
    
    /**
     * Matches closing bracket
     * @type RegExp
     * @static
     */
    static END_BLK_RE = Utils.createRegExp('\\}$');
    
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
     * Helper method that returns the number of tabs at the beginning of the line
     * @returns {Number[]}
     * @private
     */
	__getTabMatches__(line) {
        var initSpaces = line.match(/^(\s+)/g);
        if (initSpaces) return initSpaces[0].match(Program.TABS_RE);
        else return null;
    }

    /**
     * Adds a line to the program
     * @param {String} line
     * @public
     */
    addLine(line) {
        
        //var tabMatches = this.__getTabMatches__(line);

        if (line.match(Program.BEGIN_BLK_RE)) {
            
            this.__brackets__.push(true);
            //this.__tabs__ = = (tabMatches ? tabMatches.length : 0) + 1;
            this.__tabs__++;
            
        } else {
            //this.__tabs__ = tabMatches ? tabMatches.length : 0;
        }
        
        this.__lines__.push(line);
        
        if (line.match(Program.END_BLK_RE)) {
            this.__brackets__.pop();
            this.__tabs__--;
        }
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