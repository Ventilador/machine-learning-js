module.exports = function predict(x, c) {
    if (x.length !== (c.length - 1)) {
        throw 'Invalid arguments';
    }
    let index = x.length;
    let result = c[index];
    while (index--) {
        result += x[index] * c[index];
    }
    return result;
};
