/**
 * Program lines
 * @module apps/shell/program
 * @requires system/utils/utils
 * @requires apps/shell/config
 * @exports Program
 * @author Francisco Ramos <fran@jscriptcoder.com>
 */

import Utils = require('../../system/utils/utils');
import Config = require('./config');

/**
 * Keeps track of lines of program. Used when writing blocks {} 
 * or using shift+enter
 * @class Program
 */
class Program {
    
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
    get is() { return !!this.__lines__.length }

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
     * Returns tabs-spaces
     * @readonly
     * @returns {String}
     * @public
     */
    get strTabs() {
        var tabs = '';
        for(var i = this.__tabs__; i > 0; i--) tabs += Config.tab;
        return tabs;
    }

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
    get() { return this.__lines__.join('') }

    /**
     * Adds a line to the program
     * @param {String} line
     * @public
     */
    addLine(line) {

        // beginning of a block
        if (line.match(Program.BEGIN_BLK_RE)) {
            this.beginBlock();
        }
        
        this.__lines__.push(line);
        
        // end of a block
        if (line.match(Program.END_BLK_RE)) {
            this.endBlock();
        }
    }

    /**
     * Initialises a block
     * @public
     */
    beginBlock() {
        this.__brackets__.push(true);
        this.__tabs__++;
    }

    /**
     * Ends a block
     * @public
     */
    endBlock() {
        this.__brackets__.pop();
        this.__tabs__--;
    }

    /**
     * Returns the last line of the program
     * @returns {String}
     * @public
     */
    getLastLine() { return this.__lines__[this.__lines__.length - 1] }

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