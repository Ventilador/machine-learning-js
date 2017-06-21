module.exports = function scale(x, by) {
    let length = x.length;
    const YL = length ? x[0].length : 0;
    while (length--) {
        let yL = YL;
        let row = x[length];
        while (yL--) {
            row[yL] = (row[yL] - by[0][yL]) / (by[1][yL] - by[0][yL]);
        }
    }
    return x;
};