define(['../../build/js/wrapper'], function(Wrapper) {

    describe('Class Wrapper', function() {
        var element;

        beforeEach(function () {
            element = new Wrapper(document.createElement('div'));
        })

        it('new Wrapper', function() {
            expect(element).toEqual(jasmine.any(ElementWrapper));
        });

        it('Wrapper#el', function () {
            expect(element.el).toEqual(jasmine.any(HTMLElement));
        });

        it('Wrapper#hide & Wrapper#show', function () {
            element.hide();
            expect(element.el.style.display).toEqual('none');

            element.show();
            expect(element.el.style.display).toEqual('');
        });

        it('Wrapper#append', function () {
            element.append(document.createElement('span'));
            expect(element.el.innerHTML).toEqual('<span></span>');
        });

        it('Wrapper#addClass & Wrapper#removeClass', function () {
            element.addClass('test');
            expect(element.el.classList.contains('test')).toBeTruthy();

            element.removeClass('test');
            expect(element.el.classList.contains('test')).toBeFalsy();
        });

    });

});