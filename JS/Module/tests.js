module.exports = function benchmarks(injector, options) {
    let toRun = [];
    const Jasmine = require('jasmine');
    const jasmine = Object.create(Jasmine.prototype);
    Jasmine.call(jasmine);
    if (Array.isArray(options.toRun)) {
        toRun = options.toRun;
    } else if (options.toRun === '%all') {
        toRun = injector.getServicesKeys();
    }
    let length = toRun.length;
    while (length--) {
        const service = injector.getService(toRun[length]);
        const data = service.$$unitTesting;
        if (data) {
            const samples = data.samples;
            const processor =
                'samplesResult' in data ?
                    defaultValueProcessor(data.samplesResult) :
                    (
                        typeof data.processor === 'function' ?
                            data.processor :
                            injector.invoke(data.processor)
                    );
            const comparator = data.comparator || 'toEqual';
            describe(service.$$name, function () {
                let index = service.$$keys.length;
                while (index--) {
                    const currentVersion = injector.get(service.$$name, service.$$keys[index]);
                    it('should pass with version ' + service.$$keys[index], function () {
                        let currentSample = samples.length;
                        while (currentSample--) {
                            const result = currentVersion.apply(null, samples[currentSample]);
                            expect(result)[comparator](processor(samples[currentSample], currentSample));
                        }
                    });
                }
            });
        }
    }
    jasmine.execute();
};

function defaultValueProcessor(samples) {
    return function (_, index) {
        return samples[index];
    };
}
