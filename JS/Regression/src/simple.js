const mean = require('./../../Math/src/cpu/mean');
const dot = require('./../../Math/src/cpu/dot');
module.exports = function simple(x_, y_) {
    const x = mean(x_), y = mean(y_);
    const toReturn = {
        slope: ((x * y) - mean(dot(x_, y_))) /
        ((x * x) - mean(dot(x_, x_))),
        intercept: null
    };
    toReturn.intercept = y - (toReturn.slope * x);
    return toReturn;
};
