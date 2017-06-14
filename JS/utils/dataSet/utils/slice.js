module.exports = slice;
function slice(arg) {
    let length = arg.length;
    const toReturn = new Array(length);
    while (length--) {
        const current = arg[length];
        if (Array.isArray(current)) {
            toReturn[length] = slice(current);
        } else {
            toReturn[length] = current;
        }
    }
}
