const SortedList = require('./../utils/sortedArray');
const euc = require('./../Math/src/cpu/eucledeanDistance');
module.exports = function KNearesNeightbors(options) {
    const data = options.data;
    const k = options.k;
    const predict = options.predict;
    let keys = Object.keys(data);
    const sorted = new SortedList(comparator, k);

    let ii = keys.length;
    while (ii--) {
        const key = keys[ii];
        const currentData = data[key];
        let length = currentData.length;
        while (length--) {
            sorted.push({
                group: key,
                distance: euc(currentData[length], predict)
            });
        }
    }
    return sorted.slice();
};

function comparator(a, b) {
    return a.distance >= b.distance;
}
