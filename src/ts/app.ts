/**
 * @module app
 * @requires config
 * @requires terminal
 * @requires prompt
 * @requires output
 */

import Config = require('./config');
import Prompt = require('./prompt');
import Output = require('./output');
import Terminal = require('./terminal');

var prompt = new Prompt(document.getElementById('prompt'), document);
var output = new Output(document.getElementById('output'));
var terminal = new Terminal(document.getElementById('terminal'), prompt, output);

terminal.print('This is a test');