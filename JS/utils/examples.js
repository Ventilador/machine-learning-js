const Baby = require('babyparse');
const path = require('path');
const fs = require('fs');

module.exports = function (key) {
    return loadFile(keys[key]);
};
const keys = {
    'yachts': {
        fileName: 'yacht_hydrodynamics.data.csv',
        delimiter: ','
    },
    'breastCancer': {
        fileName: 'breast-cancer-wisconsin.data.csv',
        delimiter: ','
    }
};


function loadFile(options) {
    let result;
    try {
        const content = fs.readFileSync(path.resolve('./JS/utils/data/', options.fileName), 'utf8');
        result = Baby.parse(content, {
            delimiter: options.delimiter
        });
    } catch (err) {
        console.error(err);
        return [];
    }
    return result.data;
}

