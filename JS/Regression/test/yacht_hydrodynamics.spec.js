const examples = require('./../../utils/examples');
const calculateRegressionMultiple = require('./../src/multiple');
const predict = require('./../../Math/src/cpu/predict');
const minmax = require('./../../Math/src/cpu/minmax');
const scale = require('./../../Math/src/cpu/scale');
describe('Regression on yachts', function () {
    it('should calculate regression with more thant 60% accuracy', function () {
        const data = examples('yachts');
        scale(data, minmax(data));
        let testDataLength = ~~(data.length * 0.1) + 1;
        const testData = [];
        while (testDataLength--) {
            testData.push(data.splice(~~(Math.random() * data.length), 1)[0]);
        }
        const scoresTrain = data.map(function (current) {
            return current.splice(-1, 1)[0];
        });
        const scoresTest = testData.map(function (current) {
            return current.splice(-1, 1)[0];
        });
        const coef = calculateRegressionMultiple({
            data: data,
            score: scoresTrain,
            nEpoch: 6,
            l_rate: 0.001
        });
        let result = 0, iteration = testData.length;
        while (iteration--) {
            const prediction = predict(testData[iteration], coef);
            result += prediction > scoresTest[iteration] ? prediction - scoresTest[iteration] : scoresTest[iteration] - prediction;
        }
        result = 1 - (result / testData.length);
        console.log('acuracy:', result);
        expect(result).toBeGreaterThan(0.8);
    });
});