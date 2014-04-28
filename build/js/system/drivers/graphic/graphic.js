/**
* HTML graphic driver
* @module system/drivers/graphic/graphic
* @requires system/utils
* @requires system/drivers/graphic/domwrap
* @requires system/drivers/graphic/config
* @exports Graphic
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../utils', './domwrap', './config'], function(require, exports, Utils, DOMWrap, Config) {
    /**
    * @class Graphic
    * @extends DOMWrap
    */
    var Graphic = (function (_super) {
        __extends(Graphic, _super);
        /**
        * Initializes and instance of Graphic, calling the constructor of DOMWrap
        * @param {Document} doc
        * @param {HTMLElement} [screenEl = <div id="screen" />]
        * @constructor
        */
        function Graphic(doc, screenEl) {
            console.log('[Graphic#constructor] Initializing graphic driver...');

            _super.call(this, screenEl || doc.getElementById(Config.screenElemId) || doc.body);

            this.__output__ = this.el;
        }
        Object.defineProperty(Graphic.prototype, "doc", {
            /**
            * doc getter
            * @returns {Document}
            * @public
            */
            get: function () {
                return this.__doc__;
            },
            enumerable: true,
            configurable: true
        });

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
                if (Utils.isDOMElement(output)) {
                    this.__output__ = output;
                } else {
                    throw Error('[Graphic#set output] Wrong DOM element');
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * Wrapper for document.createElement method
        * @param {String} tagName
        * @return {HTMLElement}
        * @public
        */
        Graphic.prototype.createElement = function (tagName) {
            return this.doc.createElement(tagName);
        };

        /**
        * Wrapper for document.getElementById method
        * @param {String} id
        * @return {HTMLElement}
        * @public
        */
        Graphic.prototype.getElementById = function (id) {
            return this.doc.getElementById(id);
        };

        /**
        * Creates DOM elements from a html strings
        * @param {String} html
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.createElementByHtml = function (htmlEl) {
            if (typeof htmlEl === "undefined") { htmlEl = ''; }
            var tmp = this.createElement('div');
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
        Graphic.prototype.appendHtmlElement = function (html, appendTo) {
            if (typeof appendTo === "undefined") { appendTo = this.output; }
            var el;

            if (Utils.isString(html)) {
                el = this.createElementByHtml(html);
            } else if (Utils.isDOMElement(html)) {
                el = html;
            } else {
                throw Error('[Graphic#appendHtmlElement] Wrong parameter');
            }

            appendTo.appendChild(el);

            return el;
        };

        /**
        * Gets back a DOM element by #id, tag or .class (implementation inspired by Sizzle)
        * @param {String} selector
        * @param {HTMLElement} [contextEl = Graphic.doc]
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.getDOMElement = function (selector, contextEl) {
            if (typeof contextEl === "undefined") { contextEl = this.doc; }
            var match = Graphic.rquickExpr.exec(selector), m;

            if ((m = match[1])) {
                return this.getElementById(m);
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
        * return {String}
        * @public
        */
        Graphic.prototype.htmlEncode = function (str) {
            var el = this.createElement('div');
            el.innerText = el.textContent = str;
            return el.innerHTML.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g, '&nbsp;');
        };

        /**
        * Prints a message wrapping it in a div
        * @param {String|String[]} message
        * @param {HTMLElement} [appendTo = this.output]
        * @throws {Error} Wrong message
        * @public
        */
        Graphic.prototype.print = function (message, appendTo) {
            var _this = this;
            if (Utils.isArray(message)) {
                message.forEach(function (line) {
                    return _this.print(line);
                });
            } else if (Utils.isString(message)) {
                console.log('[Graphic#print] Printing message:', message);

                var div = this.createElement('div');
                div.innerHTML = message.replace(/^\s/g, '&nbsp;');
                this.appendHtmlElement(div, appendTo);
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
