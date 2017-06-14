const wrapper = require('./wrapper');
describe('looping', function () {
    describe('forEach', function () {
        it('should be faster than regular loop', function (done) {
            const array = new Array(10000);
            wrapper(function () {
                doFor(array);
            }, function () {
                array.forEach(function (val) { if (val !== undefined) throw 'boom'; });
            }).then(function (result) {
                expect(result).toBe(1);
                done();
            });
        });
    });
});

function doFor(array) {
    for (let ii = 0; ii < array.length; ii++) { if (array[ii] !== undefined) throw 'boom'; }
}