const minmax = require('./../../../Math/src/cpu/minmax');
const scale = require('./../../../Math/src/cpu/scale');
module.exports = function (val) {
    if (val === true) {
        return withMinMax;
    }
    return withVal(val);
};

function withMinMax(data) {
    return scale(data, minmax(data));
}

function withVal(val) {
    return function (data) {
        return scale(data, val);
    };
}