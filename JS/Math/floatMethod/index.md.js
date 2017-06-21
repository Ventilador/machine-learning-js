const register = require('./../../Module');
const Big = require('big.js');
function makeSampleArg() {
    return [makeRandomValue(), makeRandomValue(), makeRandomPrecision()]
}

function makeRandomValue() {
    return +(Math.random().toFixed(makeRandomPrecision()));
}
function makeRandomPrecision() {
    return ~~(Math.random() * 10);
}

const samples = require('./../utils/range')(100, 'value', null);


register('div', {
    default: [register.valueFn(require('./div'))],
    unitTesting: {
        samples: samples.map(function () {
            return makeSampleArg();
        }),
        processor: function (inputs) {
            const a = new Big(inputs[0]);
            const b = new Big(inputs[1]);
            const result = a.div(b);
            return Number(result.toFixed(inputs[2]));
        }
    }
});

register('plus', {
    default: [register.valueFn(require('./plus'))],
    unitTesting: {
        samples: samples.map(() => makeSampleArg()),
        processor: function (inputs) {
            const a = new Big(inputs[0]);
            const b = new Big(inputs[1]);
            const result = a.plus(b);
            return Number(result.toFixed(inputs[2]));
        }
    }
});

register('times', {
    default: [register.valueFn(require('./times'))],
    unitTesting: {
        samples: samples.map(() => makeSampleArg()),
        processor: function (inputs) {
            const a = new Big(inputs[0]);
            const b = new Big(inputs[1]);
            const result = a.times(b);
            return Number(result.toFixed(inputs[2]));
        }
    }
});