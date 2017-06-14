const copy = require('./../utils/copy');
const forEach = require('./../../objForEach');
module.exports = groupBy;
function groupBy(cb, index) {
    if (typeof cb === 'object') {
        const result = {};
        forEach(cb, function (val, key) {
            if (key in this) {
                result[key] = groupBy.call(this[key], val, index);
            }
        }, this);
        return result;
    }
    const result = cb(this, index);
    if (typeof result === 'string') {
        const returnVal = {};
        returnVal[result] = copy(this);
        return returnVal;
    }
    return result;
}

groupBy.push = function (DataSet) {
    return function (fn) {
        return DataSet(this, {
            actions: {
                action: 'groupBy',
                arguments: fn
            }
        });
    };
};
