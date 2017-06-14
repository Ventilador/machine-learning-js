module.exports = select;
function select(doEach, cb, args) {
    let length = this.length;
    if (doEach) {
        const result = new Array(length);
        while (length--) {
            result[length] = cb(this[length], length, this, args);
        }
        return result;
    }
    return cb(this, args);
}

select.push = function (DataSet) {
    return function (doEach_, cb_, args) {
        if (typeof doEach_ === 'function') {
            return DataSet(this, {
                actions: {
                    action: 'select',
                    arguments: [false, doEach_, cb_]
                }
            });

        } else {
            return DataSet(this, {
                actions: {
                    action: 'select',
                    arguments: [doEach_, cb_, args]
                }
            });
        }
    };
};