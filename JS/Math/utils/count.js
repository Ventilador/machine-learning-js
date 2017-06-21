module.exports = function count(x, select) {
    let length = x.length;
    const values = Object.create(null);
    while (length--) {
        const key = select ? select(x[length]) : x[length];
        if (!(key in values)) {
            values[key] = 0;
        }
        values[key]++;
    }
    return values;
};
