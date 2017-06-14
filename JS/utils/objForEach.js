module.exports = function (obj, cb, context_) {
    if (!obj || !cb) {
        return obj;
    }
    const context = context_ || null;
    for (let i = 0, array = Object.keys(obj), cur = array[i]; i < array.length; cur = array[++i]) {
        cb.call(context, obj[cur], cur);
    }
    return obj;
};