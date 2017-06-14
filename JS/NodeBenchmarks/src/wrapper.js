const benchmark = require('benchmark');
module.exports = function wrapper() {
    const suite = new benchmark.Suite();
    let length = arguments.length;
    while (length--) {
        suite.add(length, arguments[length]);
    }
    return new Promise(function (resolve) {
        suite.on('complete', function () {
            resolve(this.filter('fastest').map('name')[0]);
        }).run();
    });
};
