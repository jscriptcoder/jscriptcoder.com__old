/**
 * @module app
 * @requires config
 * @requires terminal
 * @requires prompt
 * @requires output
 */

import Config = require('./config');
import Terminal = require('./terminal');

var terminal = new Terminal(document.getElementById('terminal'));

terminal.print(Config.msgHeader);