module.exports = function copy(val) {
    if (val == undefined) return val; // jshint ignore:line
    let toReturn;
    if (Array.isArray(val)) {
        let length = val.length;
        toReturn = new Array(length);
        while (length--) toReturn[length] = copy(val[length]);
    } else if (val.toString && val.toString() === '[object Data]') {
        toReturn = new Date(+val);
    } else if (typeof val === 'object') {
        toReturn = {};
        for (
            let i = 0,
            array = Object.keys(val),
            length = array.length,
            currentKey = array[i];

            i < length;

            currentKey = array[++i]) {
            toReturn[currentKey] = copy(val[currentKey]);
        }
    } else {
        toReturn = val;
    }
    return toReturn;
};