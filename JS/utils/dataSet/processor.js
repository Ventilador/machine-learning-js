const where = require('./processors/where');
const select = require('./processors/select');
const groupBy = require('./processors/groupBy');

module.exports = processor;
Object.defineProperty(processor, 'NULL', {
    writable: false,
    value: NULL
});

function processor(row_, actions, index) {
    let row = row_;
    for (let length = 0; length < actions.length && row !== NULL; length++) {
        const current = actions[length];
        switch (current.action) {
            case 'where':
                if (!where.apply(row, current.arguments)) {
                    row = NULL;
                }
                break;
            case 'select':
                row = select.apply(row, current.arguments);
                break;
            case 'groupBy':
                row = groupBy.call(row, current.arguments, index);
                break;
            default:
                break;
        }
    }
    return row;
}

function NULL() { }