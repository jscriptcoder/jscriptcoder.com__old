define(['../../build/js/output'], function(Output) {

    describe('Class Output', function() {
        var output;

        beforeEach(function () {
            output = new Output(document.createElement('div'));
        });

        it('new Output', function() {
            expect(output).toEqual(jasmine.any(Output));
        });

        it('Output#print', function () {
            output.print('test')
            expect(output.el.innerText).toEqual('test');
        });

    });

});