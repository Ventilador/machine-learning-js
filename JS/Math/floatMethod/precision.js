module.exports = function (num_) {
    const num = String(num_);
    for (let ii = 0; ii < num.length; ii++) {
        if (num[ii] === '.') {
            return num.length - ii - 1;
        }
    }
    return 0;
};