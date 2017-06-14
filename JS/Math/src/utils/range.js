module.exports = function range(size_, mode_, length) {
    let size = size_;
    let toReturn = new Array(size);
    switch (mode_) {
        case 'reverse':
            while (size--) {
                toReturn[size] = size_ - size;
            }
            break;
        case 'random':
            while (size--) {
                toReturn[size] = ~~(Math.random() * size_);
            }
            break;
        case 'randomSorted':
            const used = Object.create(null);
            while (size) {
                const random = ~~(Math.random() * length);
                if (!used[random]) {
                    used[random] = true;
                    size--;
                    toReturn.push(random);
                }
            }
            toReturn = toReturn.sort(comparer);
            break;
        case 'shuffledIndexes':
            let temp = size_;
            while (temp--) toReturn[temp] = temp;
            while (size) {
                const ran = ~~(Math.random() * size);
                size--;
                temp = toReturn[ran];
                toReturn[ran] = toReturn[size];
                toReturn[size] = temp;
            }
            break;
        default:
            while (size--) {
                toReturn[size] = size;
            }
            break;
    }
    return toReturn;
};

function comparer(a, b) { return a - b; }
