const regex = /{(\d+)}/g;
module.exports = function (val) {
    let ii = 1, length = arguments.length, slided = [];
    for (; ii < length; ii++) {
        slided.push(arguments[ii]);
    }
    return val.replace(regex, function (match, number) {
        return slided[number] !== undefined ? slided[number] : match;
    });
};




