const dot = require('./dot');
const mean = require('./mean');
const fn = require('./fn');
function createRandomMeans(samples_) {
    const samples = typeof samples_ === 'number' ? samples_ : 10;
    const toReturn = [];
    for (let ii = 0; ii < samples; ii++) {
        const temp = makeArray(10);
        let sum = 0, index = 10;
        while (index--) {
            sum += temp[index];
        }
        toReturn.push([[temp], sum / 10]);
    }
    return toReturn;
}
function createRandomFns(samples_) {
    const samples = typeof samples_ === 'number' ? samples_ : 10;
    const toReturn = [];
    for (let ii = 0; ii < samples; ii++) {
        const temp1 = makeArray(10);
        const temp2 = makeArray(10);
        const temp3 = makeArray(10);
        const result = new Array(10);
        let index = temp1.length;
        while (index--) {
            result[index] = (temp1[index] * temp2[index]) + temp3[index];
        }
        toReturn.push([[temp1, temp2, temp3], result]);
    }
    return toReturn;
}
function createRandomDots(samples_) {
    const samples = typeof samples_ === 'number' ? samples_ : 10;
    const toReturn = [];
    for (let ii = 0; ii < samples; ii++) {
        const temp1 = makeArray(10);
        const temp2 = makeArray(10);
        const result = new Array(10);
        let index = temp1.length;
        while (index--) {
            result[index] = temp1[index] * temp2[index];
        }
        toReturn.push([[temp1, temp2], result]);
    }
    return toReturn;
}

function makeArray(length) {
    const toReturn = new Array(length);
    while (length--) {
        toReturn[length] = ~~(Math.random() * 100);
    }
    return toReturn;
}
const tests = {
    dot: {
        method: dot,
        samples: createRandomDots(4)
    },
    mean: {
        method: mean,
        samples: createRandomMeans(4)
    },
    fn: {
        method: fn,
        samples: createRandomFns(4)
    }
};
describe('Math tests (simples to check value basically)', function () {
    const keys = Object.keys(tests);
    keys.forEach(function (current) {
        it('should support ' + current, function () {
            const method = tests[current].method;
            tests[current].samples.forEach(function (sample) {
                expect(method.apply(null, sample[0])).toEqual(sample[1]);
            });
        });
    });
});