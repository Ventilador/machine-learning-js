const precision = require('./../floatMethod/precision');
const plus = require('./../floatMethod/plus');
module.exports = function arrange(start_, stop, step_) {
    let start = start_ || 0;
    const step = step_ || 1;
    const p = precision(step);
    const array = [];
    while (start < stop) {
        array.push(start);
        start = plus(start, step, p);
    }
    return array;
};
