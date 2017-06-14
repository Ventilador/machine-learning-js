const examples = require('./../utils/examples');
const dataSet = require('./../utils/dataSet/dataSetClass');
const range = require('./../Math/src/utils/range');
const KNearestNeightbors = require('./kNearesNeightbors');
const count = require('./../Math/src/utils/count');
fdescribe('KNearestNeightbors', function () {
    const data = examples('breastCancer');
    const headers = data.shift();
    const dataSize = ~~(data.length * 0.2);
    let visited = 0;
    let good, bad, test_data, test_results;
    beforeEach(function () {
        const result = dataSet(data)
            .headers(headers)
            .drop(['id'])
            .shuffle()
            .toFloat({
                nanTo: 0
            })
            .where(function (row) {
                return row.length;
            })
            .select(function (row) {
                if (!Array.isArray(row)) throw 'Not an array';
                let length = row.length;
                while (length--) {
                    const cur = row[length];
                    if (typeof cur !== 'number') throw 'Not a number';
                    if (cur !== cur) throw 'Nan';
                }
                return row;
            })
            .groupBy(function (row, index) {
                if (index < dataSize) {
                    visited++;
                    return {
                        test_data: row.slice(0, -1),
                        test_results: row[row.length - 1] === 2 ? ['bad'] : ['good']
                    };
                }
                const toReturn = {};
                toReturn[row[row.length - 1] === 2 ? 'bad' : 'good'] = row.slice(0, -1);
                return toReturn;

            })
            .toList();
        good = result.good;
        bad = result.bad;
        test_data = result.test_data;
        test_results = result.test_results;
    });
    for (let _ = 0; _ < 10; _++) {
        it('should calculate KNearestNeightbors', function () {
            let sum = 0;
            test_data.forEach(function (val, index) {
                const result = KNearestNeightbors({
                    data: {
                        good: good,
                        bad: bad
                    },
                    k: 5,
                    predict: val
                });
                const counts = count(result, i => i.group);
                sum += +(test_results[index][0] === ((counts.good || 0) > (counts.bad || 0) ? 'good' : 'bad'));
            });
            console.log('accuracy', sum = sum / test_data.length);
            expect(sum).toBeGreaterThan(0.9);
        });
    }
});