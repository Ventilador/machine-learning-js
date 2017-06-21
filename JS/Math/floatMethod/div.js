module.exports = function (a, b, precision) {
    return +(a / b).toFixed(precision);
};