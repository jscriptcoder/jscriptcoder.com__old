/**
* HTML graphic driver
* @module system/drivers/graphic/graphic
* @requires system/utils/utils
* @requires system/drivers/graphic/domwrap
* @requires system/drivers/graphic/config
* @exports Graphic
* @author Francisco Ramos <fran@jscriptcoder.com>
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../utils/utils', './domwrap', './config'], function(require, exports, Utils, DOMWrap, Config) {
    /**
    * @class Graphic
    * @extends DOMWrap
    */
    var Graphic = (function (_super) {
        __extends(Graphic, _super);
        /**
        * Initializes an instance of Graphic, calling the constructor of DOMWrap
        * @param {System} sys
        * @param {HTMLElement} [screenEl = <div id="screen" />]
        * @constructor
        */
        function Graphic(sys, screenEl) {
            console.info('[Graphic#constructor] Initializing graphic driver...');

            // fallbacks: Config.screenElemId or document.body
            screenEl = screenEl || Utils.getElementById(Config.screenElemId) || Utils.doc.body;

            _super.call(this, screenEl);

            this.__sys__ = sys;
            this.__output__ = this.el;
            this.__listen__(sys);
        }
        Object.defineProperty(Graphic.prototype, "output", {
            /**
            * output getter
            * @returns {HTMLElement}
            * @public
            */
            get: function () {
                return this.__output__;
            },
            /**
            * output setter
            * @param {HTMLElement} output
            * @throws {Error} Wrong DOM element
            * @public
            */
            set: function (output) {
                if (Utils.isHTMLElement(output)) {
                    this.__output__ = output;
                } else {
                    throw Error('[Graphic#set output] Wrong DOM element');
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * Installs necessary interruption-listeners
        * @param {System} sys
        * @private
        */
        Graphic.prototype.__listen__ = function (sys) {
            var _this = this;
            sys.listen('clearscreen', function () {
                return _this.empty(true);
            });
            sys.listen('clearoutput', function () {
                return _this.empty();
            });
            sys.listen('output', function (msg, type) {
                return _this.print(msg, type);
            });
        };

        /**
        * Creates DOM elements from a html strings
        * @param {String} html
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.createHTMLElement = function (htmlEl) {
            if (typeof htmlEl === "undefined") { htmlEl = ''; }
            var tmp = Utils.createElement('div');
            tmp.innerHTML = htmlEl;
            return tmp.firstChild;
        };

        /**
        * Creates and append a new DOM element to another element
        * @param {String|HTMLElement} html
        * @param {HTMLElement} [appendTo = this.output]
        * @returns {HTMLElement}
        * @throws {Error} Wrong parameter
        * @public
        */
        Graphic.prototype.appendHTMLElement = function (html, appendTo) {
            if (typeof appendTo === "undefined") { appendTo = this.output; }
            var el;

            if (Utils.isString(html)) {
                el = this.createHTMLElement(html);
            } else if (Utils.isHTMLElement(html)) {
                el = html;
            } else {
                throw Error('[Graphic#appendHtmlElement] Wrong parameter');
            }

            appendTo.appendChild(el);

            return el;
        };

        /**
        * Creates the GUI, and attach it if indicated, based on a DOM element
        * @param {String|HTMLElement} gui
        * @param Boolean} attach
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.createGUI = function (gui, attach) {
            return attach ? this.appendHTMLElement(gui) : this.createHTMLElement(gui);
        };

        /**
        * Gets back a DOM element by #id, tag or .class (implementation inspired by Sizzle)
        * @param {String} selector
        * @param {HTMLElement} contextEl
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.getHTMLElement = function (selector, contextEl) {
            var match = Graphic.rquickExpr.exec(selector), m;

            if ((m = match[1])) {
                return Utils.getElementById(m);
            } else if (match[2]) {
                return contextEl.getElementsByTagName(selector)[0];
            } else if ((m = match[3])) {
                return contextEl.getElementsByClassName(m)[0];
            } else {
                return contextEl.querySelectorAll(selector)[0];
            }
        };

        /**
        * Returns a string with the HTML entities in order to be used in HTML literals
        * @param {String} str
        * @return {String}
        * @public
        */
        Graphic.prototype.htmlEncode = function (str) {
            var el = Utils.createElement('div');
            el.innerText = el.textContent = str;
            return el.innerHTML.replace(Utils.SPACES_RE, '&nbsp;');
        };

        /**
        * Prints a message wrapping it in a div
        * @param {String|String[]} message
        * @param {String} [type]
        * @throws {Error} Wrong message
        * @public
        */
        Graphic.prototype.print = function (message, type) {
            var _this = this;
            if (Utils.isArray(message)) {
                message.forEach(function (line) {
                    return _this.print(line);
                });
            } else if (Utils.isString(message)) {
                console.log('[Graphic#print] Printing message:', message.replace(Utils.INIT_SPACES_RE, ''));

                var div = Utils.createElement('div');
                div.innerHTML = message;

                if (typeof type === 'string')
                    div.className = type;

                this.appendHTMLElement(div);
            } else {
                throw Error('[Graphic#print] Wrong message');
            }
        };

        /**
        * Empties the output by setting innerHTML to ''
        * @param {Boolean} all
        * @public
        */
        Graphic.prototype.empty = function (all) {
            if (all) {
                _super.prototype.empty.call(this);
                this.output = this.el; // redirects the output to the main screen element
            } else {
                this.output.innerHTML = '';
            }
        };
        return Graphic;
    })(DOMWrap);

    
    return Graphic;
});
