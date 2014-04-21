/**
* @module app
* @requires config
* @requires terminal
* @requires prompt
* @requires output
*/
define(["require", "exports", './prompt', './output', './terminal'], function(require, exports, Prompt, Output, Terminal) {
    var prompt = new Prompt(document.getElementById('prompt'), document);
    var output = new Output(document.getElementById('output'));
    var terminal = new Terminal(document.getElementById('terminal'), prompt, output);

    terminal.print('This is a test');
});
