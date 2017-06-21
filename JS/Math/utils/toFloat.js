module.exports = function toFloat(x_, useNew, ifNan) {
    let x = useNew ? new Array(x_.length) : x_;
    let length = x.length;
    while (length--) {
        const cur = x_[length];
        if (typeof cur === 'number') {
            if (useNew) {
                x[length] = cur;
            }
        } else {
            if (typeof cur === 'string') {
                const curNum = +cur;
                x[length] = curNum !== curNum ? ifNan : curNum;
            } else {
                if (useNew) {
                    x[length] = toFloat(cur, useNew);
                } else {
                    toFloat(cur, useNew);
                }
            }
        }
    }
    return x;
};
