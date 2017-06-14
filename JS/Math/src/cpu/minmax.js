module.exports = function minmax(x) {
    let xL = x.length, yL;
    const YL = xL ? x[0].length : 0;
    const min = x[0].slice();
    const max = min.slice();
    while (xL--) {
        const cur = x[xL];
        if (cur.length != YL) {
            x.splice(xL, 1);
        } else {
            yL = YL;
            while (yL--) {
                min[yL] = min[yL] > cur[yL] ? cur[yL] : min[yL];
                max[yL] = max[yL] < cur[yL] ? cur[yL] : max[yL];
            }
        }
    }
    return [min, max];
};
