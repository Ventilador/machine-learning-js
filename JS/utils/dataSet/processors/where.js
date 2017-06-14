module.exports = where;
function where(doEach, cb) {
    let length = this.length;
    if (doEach) {
        while (length--) {
            if (!cb(this[length], length, this)) {
                return false;
            }
        }
        return true;
    }
    return !!cb(this);
}

where.push = function (DataSet) {
    return function (doEach_, cb_) {
        if (typeof doEach_ === 'function') {
            return DataSet(this, {
                actions: {
                    action: 'where',
                    arguments: [false, doEach_, this]
                }
            });
        } else {
            return DataSet(this, {
                actions: {
                    action: 'where',
                    arguments: [doEach_, cb_]
                }
            });
        }
    };
};

