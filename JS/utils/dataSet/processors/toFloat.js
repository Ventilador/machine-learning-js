const toFloat = require('./../../../Math/src/utils/toFloat');
module.exports = {
    push: function (DataSet) {
        return function toFloat(options) {
            return DataSet(this, {
                actions: {
                    action: 'select',
                    arguments: [false, Action, options && options.nanTo]
                }
            });
        };
    }
};

function Action(data, nanTo) {
    if (nanTo !== undefined) return toFloat(data, true, nanTo);
    return toFloat(data, true);
}
