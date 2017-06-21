const mean = require('./../../Math/src/cpu/mean');
const toReturn = [];
for (let ii = 1; ii < 1000000; ii = (ii * 10)) {
    toReturn.push(ii);
}

function makeArray(length) {
    const toReturn = new Array(length);
    while (length--) {
        toReturn[length] = ~~(Math.random() * 100);
    }
    return toReturn;
}
const fs = require('fs');
fs.mkdirSync('C:\\Users\\admin\\Documents\\github\\machine-learning-js\\will-it-optimize\\myTests');
fs.mkdirSync('C:\\Users\\admin\\Documents\\github\\machine-learning-js\\will-it-optimize\\myTests\\explicit');
let path = 'C:\\Users\\admin\\Documents\\github\\machine-learning-js\\will-it-optimize\\myTests\\mean';
toReturn.forEach(saveFile);
path = 'C:\\Users\\admin\\Documents\\github\\machine-learning-js\\will-it-optimize\\myTests\\explicit\\mean';
toReturn.length = 0;
for (let ii = 1001; ii < 10000; ii += 50) {
    saveFile(ii);
}

function saveFile(current) {
    if (current === 1) {
        current = 2;
    }
    fs.writeFileSync(path + current + '.js',
        [
            'module.exports = {',
            '   description: \'mean\' + ' + current + ',',
            '   exec:' + mean.makeFunction(current).toString().replace('\n', '') + ',',
            '   args:[' + [makeArray(current)].join(',') + ']',
            '}'
        ].join('\n'));
}
