const register = require('./../Module');
register('arrange', {
    default: [register.valueFn(require('./utils/arrange'))],
    unitTesting: {
        samples: [
            [-1, 1],
            [-1, 1.1],
            [-1, 1, 0.1]
        ],
        samplesResult: [
            [-1, 0],
            [-1, 0, 1],
            [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
        ]
    }
});
register('count', {
    default: [register.valueFn(require('./utils/count'))],
    unitTesting: {
        samples: [
            [[1, 1, 2, 2, 2, 3, 3, 3, 3]],
            [[{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 3 }, { a: 3 }], function (item) { return item.a; }]
        ],
        samplesResult: [
            { 1: 2, 2: 3, 3: 4 },
            { 1: 2, 2: 3, 3: 4 }
        ]
    }
});
register('range', {
    default: [register.valueFn(require('./utils/range'))],
    unitTesting: {
        samples: [
            [5, 'value', 'anything'],
            [5],
            [5, 'reverse']
        ],
        processor: function (input, index) {
            switch (index) {
                case 0:
                    return ['anything', 'anything', 'anything', 'anything', 'anything'];
                case 1:
                    return [0, 1, 2, 3, 4];
                case 2:
                    return [0, 1, 2, 3, 4].reverse();
            }
        }
    }
});


