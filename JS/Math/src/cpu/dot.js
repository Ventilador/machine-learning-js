const format = require('./../../../utils/index').format;
const cache = {};
module.exports = dot;
function dot(x, y) {
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
    return cache[key](x, y, new Array(length));
}

dot.makeFunction = makeFunction;
function makeFunction(length_) {
    let length = length_;
    let text = [];
    while (length--) {
        text.push(format('c[{0}]=a[{0}]*b[{0}];', length));
    }
    text = text.join('') + 'return c';
    let result = new Function('a', 'b', 'c', text);// jshint ignore:line
    return result;
}


