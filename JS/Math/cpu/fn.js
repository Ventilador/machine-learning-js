const format = require('./../../../utils/index').format;
const cache = {};
module.exports = dot;
function dot(x, y, b) {
    if (!Array.isArray(x) || !Array.isArray(y)) {
        throw 'Invalid arguments';
    }

    let length = x.length;
    if (length !== y.length) {
        throw 'Invalid lengths';
    }
    const key = x + y + '';
    if (!cache[key]) {
        cache[key] = makeFunction(x.length);
    }
    return cache[key](x, y, b, new Array(length));
}

dot.makeFunction = makeFunction;
function makeFunction(length_) {
    let length = length_;
    let text = [];
    while (length--) {
        text.push(format('r[{0}]=(x[{0}]*y[{0}])+b[{0}];', length));
    }
    text = text.join('') + 'return r';
    let result = new Function('x', 'y', 'b', 'r', text);// jshint ignore:line
    return result;
}
