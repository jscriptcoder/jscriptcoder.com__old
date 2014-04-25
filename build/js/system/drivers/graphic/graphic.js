/**
* @module system/drivers/graphic/graphic
* @requires system/utils
* @requires system/system
* @requires system/drivers/graphic/domwrap
* @exports Graphic
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../utils', './domwrap'], function(require, exports, Utils, DOMWrap) {
    /**
    * @class Graphic
    * @extends DOMWrap
    */
    var Graphic = (function (_super) {
        __extends(Graphic, _super);
        /**
        * @constructor
        * @param {HTMLElement} [screenEl = <div id="screen" />]
        */
        function Graphic(screenEl) {
            console.log('[Graphic#constructor] Initializing graphic driver...');

            _super.call(this, screenEl || Graphic.doc.getElementById('screen') || document.body);

            this.__output__ = this.el;
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
                if (Utils.isDOMElement(output)) {
                    this.__output__ = output;
                } else {
                    throw Error('[DOMWrap#setOutput] Wrong DOM element');
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * Creates DOM elements from html strings
        * @param {String} html
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.createDOMElement = function (html) {
            if (typeof html === "undefined") { html = ''; }
            var div = Graphic.doc.createElement('div');
            div.innerHTML = html;
            return div.children[0];
        };

        /**
        * Creates and append a new DOM element to another element
        * @param {String|HTMLElement} html
        * @param {HTMLElement} [appendTo = this.output]
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.appendDOMElement = function (html, appendTo) {
            if (typeof appendTo === "undefined") { appendTo = this.output; }
            var el;

            if (Utils.isString(html)) {
                el = this.createDOMElement(html);
            } else if (Utils.isDOMElement(html)) {
                el = html;
            } else {
                throw Error('');
            }

            appendTo.appendChild(el);

            return el;
        };

        /**
        * Gets back a DOM element by #id, tag or .class
        * @param {String} selector
        * @param {HTMLElement} [contextEl = Graphic.doc]
        * @returns {HTMLElement}
        * @public
        */
        Graphic.prototype.getDOMElement = function (selector, contextEl) {
            if (typeof contextEl === "undefined") { contextEl = Graphic.doc; }
            var match = Graphic.rquickExpr.exec(selector), m;

            if ((m = match[1])) {
                return Graphic.doc.getElementById(m);
            } else if (match[2]) {
                return contextEl.getElementsByTagName(selector)[0];
            } else if ((m = match[3])) {
                return contextEl.getElementsByClassName(m)[0];
            } else {
                return contextEl.querySelectorAll(selector)[0];
            }
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

                var div = Graphic.doc.createElement('div');
                div.innerHTML = message.replace(/^\s/g, '&nbsp;');
                this.appendDOMElement(div, appendTo);
            } else {
                throw Error('[Graphic#print] Wrong message');
            }
        };

        /**
        * Empties the output by setting innerHTML to ''
        * @public
        */
        Graphic.prototype.empty = function () {
            this.output.innerHTML = '';
        };
        Graphic.doc = document;
        return Graphic;
    })(DOMWrap);

    
    return Graphic;
});
