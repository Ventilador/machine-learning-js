const format = require('./../../../utils/index').format;
const cache = {};
const isArrayFn = Array.isArray;
const template = '({1}(y=x[{0}])?{2}(y):y)';
module.exports = mean;
function mean(x) {
    let length = x.length;
    if (!cache[length]) {
        cache[length] = makeFunction(length);
    }
    return cache[length](x, isArrayFn, mean);
}

mean.makeFunction = makeFunction;
function makeFunction(length_) {
    let isArray = 'a', recurseMean = 'b';
    let splits = Math.ceil(length_ / 1000);
    let blockSize = Math.ceil(length_ / splits);
    let text = ['var y'];
    let counter = 0;
    let last;

    while (splits--) {
        text.push(';var v' + splits + '=' + (last ? 'v' + last + '+' : ''));
        let index = blockSize;
        while (index--) {
            text.push(format(template, counter++, isArray, recurseMean) + (counter === length_ || index === 0 ? '' : '+'));
            if (counter === length_) {
                text.push(';return v0/' + length_);
                text = text.join('');
                let result = new Function('x', isArray, recurseMean, text);// jshint ignore:line
                return result;
            }
        }
        last = splits;
    }


}
