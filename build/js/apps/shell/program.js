/**
* Program lines
* @module apps/shell/program
* @requires system/utils
* @requires apps/shell/config
* @exports Program
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
define(["require", "exports", '../../system/utils', './config'], function(require, exports, Utils, Config) {
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

        Object.defineProperty(Program.prototype, "strTabs", {
            /**
            * Returns tabs-spaces
            * @readonly
            * @returns {String}
            * @public
            */
            get: function () {
                var tabs = '';
                for (var i = this.__tabs__; i > 0; i--)
                    tabs += Config.tab;
                return tabs;
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
            return this.__lines__.join('');
        };

        /**
        * Adds a line to the program
        * @param {String} line
        * @public
        */
        Program.prototype.addLine = function (line) {
            // beginning of a block
            if (line.match(Program.BEGIN_BLK_RE)) {
                this.__brackets__.push(true);
                this.__tabs__++;
            }

            this.__lines__.push(line);

            // end of a block
            if (line.match(Program.END_BLK_RE)) {
                this.__brackets__.pop();
                this.__tabs__--;
            }
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
        Program.BEGIN_BLK_RE = Utils.createRegExp('\\{$');

        Program.END_BLK_RE = Utils.createRegExp('\\}$');
        return Program;
    })();

    
    return Program;
});
