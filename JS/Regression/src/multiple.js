const predict = require('./../../Math/src/cpu/predict');
const makeArray = require('./../../Math/src/utils/makeArray');
module.exports = function multiple(options) {
    const data = options.data;
    const score = options.score;
    const XL = data.length;
    const margin = options.errorMargin || 0;
    if (score && score.length !== XL) {
        throw 'Invalid arguments';
    }
    const YL = (XL ? data[0].length : 0.0);
    const coef = makeArray(YL + 1, 0);
    let nEpoch = options.nEpoch ? options.nEpoch : -1;
    const l_rate = options.l_rate || 0.001;
    while (nEpoch--) {
        let xL = XL;
        let error = 0;
        while (xL--) {
            const row = data[xL];
            if (row.length === YL) {
                let result = predict(row, coef) - (score ? score[xL] : row[YL - 1]);
                coef[YL] = coef[YL] - l_rate * result;
                let yL = YL;
                while (yL--) {
                    coef[yL] = coef[yL] - (l_rate * result * row[yL]);
                }
                error += result;
            }
        }
        if (error > -margin && error < margin) {
            return coef;
        }
    }
    return coef;
};
