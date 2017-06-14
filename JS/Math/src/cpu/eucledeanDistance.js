module.exports = function (x, y) {
    if (x.length !== y.length) {
        throw 'Invalid arguments';
    }
    let length = x.length;
    let overAll = 0;
    while (length--) {
        const result = x[length] - y[length];
        overAll += result * result;
    }
    if (overAll !== overAll) throw 'Nan';
    return Math.sqrt(overAll);
};