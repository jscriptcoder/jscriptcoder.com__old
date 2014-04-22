/**
* @module app
* @requires config
* @requires terminal
* @requires prompt
* @requires output
*/
define(["require", "exports", './config', './terminal'], function(require, exports, Config, Terminal) {
    var terminal = new Terminal(document.getElementById('terminal'));

    terminal.print(Config.msgHeader);
});
