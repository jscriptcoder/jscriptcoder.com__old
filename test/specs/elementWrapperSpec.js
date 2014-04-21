define(['../../build/js/elementWrapper'], function(ElementWrapper) {

    describe('Class ElementWrapper', function() {
        var element;

        beforeEach(function () {
            element = new ElementWrapper(document.createElement('div'));
        })

        it('new ElementWrapper', function() {
            expect(element).toEqual(jasmine.any(ElementWrapper));
        });

        it('ElementWrapper#el', function () {
            expect(element.el).toEqual(jasmine.any(HTMLElement));
        });

        it('ElementWrapper#hide & ElementWrapper#show', function () {
            element.hide();
            expect(element.el.style.display).toEqual('none');

            element.show();
            expect(element.el.style.display).toEqual('');
        });

        it('ElementWrapper#append', function () {
            element.append(document.createElement('span'));
            expect(element.el.innerHTML).toEqual('<span></span>');
        });

        it('ElementWrapper#addClass & ElementWrapper#removeClass', function () {
            element.addClass('test');
            expect(element.el.classList.contains('test')).toBeTruthy();

            element.removeClass('test');
            expect(element.el.classList.contains('test')).toBeFalsy();
        });

    });

});