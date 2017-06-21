const range = require('./../Math/src/utils/range');
const slice = require('./../utils/dataSet/utils/slice');
const arange = require('./../Math/src/utils/arrange');
module.exports = SVG;
function SVG(options_) {
    const featuresLength = options_.featuresLength,
        data = options_.data,
        groupA_Key = options_.groupA_Key,
        groupB_Key = options_.groupB_Key,
        dataLength = data[groupA_Key].length,
        biasesRange = options_.biasesRange,
        biasesMultiplier = options_.biasesMultiplier,
        stepRate = options_.stepRate || 0.1,
        transform = generateTransformData(dataLength);
    let initialStep = options_.initialStep || 1,
        stepDepth = options_.stepDepth || 3;
    let currentBest = range(dataLength, 'value', Infinity);

    do {
        let w = slice(currentBest);
        initialStep = initialStep * stepRate;
        let optimized = false;
        while (!optimized) {
            const biases = arange(-1, 1, 1);
            let biasesLength = biases.length;
            while (biasesLength--) {

            }
        }
    } while (stepDepth--);
}

function generateTransformData(length) {
    if (typeof length !== 'number' || length !== length) {
        throw 'Invalid transform table size: ' + length;
    }
    let each = length * length;
    const toReturn = new Array(each);
    while (each--) {
        const current = new Array(length);
        let ii = length;
        while (ii--) {
            current[ii] = ((current >> ii) & 1) || -1;
        }
        toReturn[each] = current;
    }
    return toReturn;
}

function parseData(data) {
    return data;
}
