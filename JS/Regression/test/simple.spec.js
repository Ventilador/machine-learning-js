const fitSlopIntercept = require('./../src/simple');
describe('fitSlop', function () {
    it('should calculate best fit for slope and interceptor', function () {
        // https://pythonprogramming.net/how-to-program-best-fit-line-slope-machine-learning-tutorial/
        const result = fitSlopIntercept([1, 2, 3, 4, 5], [5, 4, 6, 5, 6]);
        expect(+(result.slope.toFixed(1))).toBe(0.3);
        expect(+(result.intercept.toFixed(1))).toBe(4.3);
    });
});
