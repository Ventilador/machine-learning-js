const benchmarks = require('benchmark');
module.exports = function benchmarks(toRun, injector, options) {
    let length = toRun.length;
    while (length--) {
        const service = injector.getService(toRun[length]);
        const data = service.$$benchmarking;
        if (data) {

        }
    }
};
