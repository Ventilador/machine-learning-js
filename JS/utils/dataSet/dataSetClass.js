const where = require('./processors/where').push(DataSet);
const select = require('./processors/select').push(DataSet);
const toFloat = require('./processors/toFloat').push(DataSet);
const groupBy = require('./processors/groupBy').push(DataSet);
const drop = require('./processors/drop').push(DataSet);
const toList = require('./toList');
const proto = {
    where: where,
    select: select,
    toList: toList,
    toFloat: toFloat,
    groupBy: groupBy,
    drop: drop,
    headers: function setHeaders(val) {
        return DataSet(this, { headers: val });
    },
    shuffle: function () {
        return DataSet(this, { shuffle: true });
    }
};
module.exports = DataSet;
DataSet.isDataSet = isDataSet;

function isDataSet(obj) {
    return proto.isPrototypeOf(obj);
}

function DataSet(originalData, addons) {
    if (isDataSet(originalData)) {
        const toReturn = Object.create(proto);
        toReturn.actions = originalData.actions;
        if (addons.actions) {
            (toReturn.actions = toReturn.actions.slice()).push(addons.actions);
        }
        ensureProperty.call(toReturn, originalData, addons.headers, 'headers');
        ensureProperty.call(toReturn, originalData, addons.shuffle, 'shuffle');
        toReturn.data = originalData.data;
        return toReturn;
    }
    const toReturn = Object.create(proto);
    toReturn.data = originalData;
    toReturn.actions = [];
    return toReturn;
}

function ensureProperty(orig, val, key) {
    if (val !== undefined) {
        this[key] = val;
    } else {
        this[key] = orig[key];
    }
}



