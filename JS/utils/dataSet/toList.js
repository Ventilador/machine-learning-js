const slice = require('./utils/slice');
const range = require('./../../Math/src/utils/range');
const processor = require('./processor');
const scale = require('./processors/scale');
const NULL = processor.NULL;
const EMPTY = Object.create(null);
module.exports = function toList(options_) {
    const options = options_ || EMPTY;
    const preProcessQueue = [];
    const postProcessorQueue = [];
    if (options.preProcess) {
        push.call(preProcessQueue, options.preProcess);
    }
    if (options.postProcessor) {
        push.call(postProcessorQueue, options.postProcessor);
    }
    if (options.scale) {
        push.call(postProcessorQueue, scale(options.scale));
    }
    if (this.actions.length) {
        let toReturn;
        const shuffled = this.shuffle ? range(this.data.length, 'shuffledIndexes') : false;
        for (let dLength = 0, length = this.data.length; dLength < length; dLength++) {
            const result = processor(this.data[shuffled ? shuffled[dLength] : dLength], this.actions, dLength);
            if (result !== NULL) {
                toReturn = merge(toReturn, result);
            }
        }

        return toReturn;
    }
    return slice(this.data);
};

function merge(dest_, source) {
    let dest = dest_;
    if (!dest) {
        dest = create(source);
    }

    if (Array.isArray(source)) {
        if (!Array.isArray(dest)) {
            throw 'Invalid type';
        }
        dest.push(source);
    } else if (typeof source === 'object') {
        if (Array.isArray(dest)) {
            throw 'Invalid type';
        }
        const keys = Object.keys(source);
        for (let i = 0, cur = keys[i]; i < keys.length; cur = keys[++i]) {
            dest[cur] = merge(dest[cur], source[cur]);
        }
    } else {
        throw 'Invalid source';
    }
    return dest;
}

function create(obj) {
    if (Array.isArray(obj)) {
        return [];
    } else if (typeof obj === 'object') {
        return {};
    }
    return Object.create(Object.getPrototypeOf(obj));
}

function push(val) {
    if (Array.isArray(val)) {
        for (let length = val.length, ii = 0; ii < length; ii++) {
            this.push(val[length]);
        }
        return;
    }
    this.push(val);
}

