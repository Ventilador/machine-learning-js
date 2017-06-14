module.exports = function makeArray(length_, val_) {
    let length = length_;
    const useRandom = arguments.length === 1;
    const toReturn = new Array(length);
    if (useRandom) {
        while (length--) {
            toReturn[length] = ~~(Math.random() * 100);
        }
        return toReturn;
    }
    while (length--) {
        toReturn[length] = val_;
    }
    return toReturn;
};
