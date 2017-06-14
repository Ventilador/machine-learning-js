module.exports = {
    push: function (DataSet) {
        return function drop(columns) {
            return DataSet(this, {
                actions: {
                    action: 'select',
                    arguments: [false, Action, [columns, this.headers]]
                }
            });
        };
    }
};

function Action(data, args) {
    const columnsToDrop = args[0], headers = args[1], toReturn = [];
    for (let ii = 0; ii < data.length; ii++) {
        if (columnsToDrop.indexOf(headers ? headers[ii] : ii) === -1) {
            toReturn.push(data[ii]);
        }
    }
    return toReturn;
}