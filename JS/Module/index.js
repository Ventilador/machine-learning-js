const merge = require('./merge');
const defaultConfig = {
    mode: 'load',
    getProperty: getProperty
};
const defaultBenchmarkConfig = {
    getProperty: getProperty,
    toRun: '%all',
    saveData: false
};
const defaultTestConfig = {
    getProperty: getProperty,
    toRun: '%all',
    saveData: false
};
const services = Object.create(null);
module.exports = function register(name, obj) {
    if (typeof name !== 'string') {
        throw 'Invalid arguments while creating a module';
    }
    if (!(name in services)) {
        services[name] = {
            $$name: name,
            $$keys: []
        };
    }
    merge(services[name], obj);
};
global.register = module.exports;
module.exports.bootstrap = bootstrap;
function bootstrap(config) {
    const mode = defaultConfig.getProperty(config, 'mode');
    const injector = require('./injector')(services);
    switch (mode) {
        case 'load':
            return injector;
        case 'benchmark':
            let toBenchmark = defaultBenchmarkConfig.getProperty(config, 'toRun');
            if (toBenchmark === '%all') {
                toBenchmark = Object.keys(services);
            }
            return require('./benchmarks')(toBenchmark, services, {
                saveData: defaultBenchmarkConfig.getProperty(config, 'saveData')
            });
        case 'test':
            return require('./tests')(injector, {
                toRun: defaultTestConfig.getProperty(config, 'toRun')
            });
        default:
            break;
    }
}
module.exports.valueFn = function (val) {
    return function () {
        return val;
    };
};

function getProperty(config, key) {
    return (config && config[key]) || this[key];
}



