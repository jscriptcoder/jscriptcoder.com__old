define(['../../build/js/prompt'], function(Prompt) {

    describe('Class Prompt', function() {
        var prompt;

        beforeEach(function () {
            var promptEl = document.createElement('div');
            var symbol = document.createElement('span');
            var input = document.createElement('span');
            var cursor = document.createElement('span');

            symbol.classList.add('symbol');
            input.classList.add('input');
            cursor.classList.add('cursor');

            promptEl.appendChild(symbol);
            promptEl.appendChild(input);
            promptEl.appendChild(cursor);

            prompt = new Prompt(promptEl, document.createElement('div'));
        });

        it('new Prompt', function() {
            expect(prompt).toEqual(jasmine.any(Prompt));
        });

        it('Prompt#symbol', function () {
            expect(prompt.symbol).toEqual(jasmine.any(HTMLElement));
            expect(prompt.symbol.className).toEqual('symbol')
        });

        it('Prompt#input', function () {
            expect(prompt.input).toEqual(jasmine.any(HTMLElement));
            expect(prompt.input.className).toEqual('input')
        });

        it('Prompt#cursor', function () {
            expect(prompt.cursor).toEqual(jasmine.any(HTMLElement));
            expect(prompt.cursor.className).toEqual('cursor')
        });

    });

});