/**
* Program lines
* @module apps/shell/program
* @requires system/utils
* @exports Program
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", '../../system/utils'], function(require, exports, Utils) {
    /**
    * Keeps track of lines of program. Used when writing blocks {}
    * or using shift+enter
    * @class Program
    */
    var Program = (function () {
        /**
        * @constructor
        */
        function Program() {
            /**
            * @type String[]
            * @private
            */
            this.__lines__ = [];
            /**
            * Keeps track of the current block
            * @type Boolean
            * @private
            */
            this.__brackets__ = [];
            /**
            * Keeps track of the current tab
            * @type Number
            * @private
            */
            this.__tabs__ = 0;
            console.log('[Program#constructor] Instantiating a program...');
        }
        Object.defineProperty(Program.prototype, "is", {
            /**
            * is getter. Whether or not we have a program
            * @readonly
            * @returns {Boolean}
            * @public
            */
            get: function () {
                return this.__lines__.length;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Program.prototype, "isBlock", {
            /**
            * isBlock getter. Whether or not we are in a block
            * @readonly
            * @returns {Boolean}
            * @public
            */
            get: function () {
                return this.__brackets__.length > 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Program.prototype, "numTabs", {
            /**
            * numTabs getter
            * @readonly
            * @returns {Number}
            * @public
            */
            get: function () {
                return this.__tabs__;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Program.prototype, "numLines", {
            /**
            * numLines getter
            * @readonly
            * @returns {Number}
            * @public
            */
            get: function () {
                return this.__lines__.length;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Program.prototype, "isLastBlock", {
            /**
            * isLastBlock getter. Whether or not we are in the last block
            * @readonly
            * @returns {Boolean}
            * @public
            */
            get: function () {
                return this.__brackets__.length === 1;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the program in one line
        * @returns {String}
        * @public
        */
        Program.prototype.get = function () {
            return this.__lines__.join('').replace(Program.TABS_RE, '');
        };

        /**
        * Adds a line to the program
        * @param {String} line
        * @public
        */
        Program.prototype.addLine = function (line) {
            var tabMatches = line.match(Program.TABS_RE);

            if (line.match(Program.BEGIN_BLK)) {
                this.__brackets__.push(true);
                this.__tabs__ = (tabMatches ? tabMatches.length : 0) + 1;
            } else {
                this.__tabs__ = tabMatches ? tabMatches.length : 0;
            }

            this.__lines__.push(line);

            if (line.match(Program.END_BLK))
                this.__brackets__.pop();
        };

        /**
        * Clears the program
        * @public
        */
        Program.prototype.clear = function () {
            this.__lines__.length = 0;
            this.__brackets__.length = 0;
            this.__tabs__ = 0;
        };
        Program.TABS_RE = Utils.createRegExp('\t', 'g');

        Program.BEGIN_BLK = Utils.createRegExp('\{$');

        Program.END_BLK = Utils.createRegExp('\}$');
        return Program;
    })();

    
    return Program;
});