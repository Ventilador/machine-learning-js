const INSTANCIATING = Symbol('INSTANCIATING');
const compileInjection = require('./compileInjection');
module.exports = function injector(services) {
    const cache = Object.create(null);
    return {
        getServicesKeys: getServicesKeys,
        getService: getService,
        get: get,
        has: has,
        invoke: invoke
    };

    function getServicesKeys() {
        return Object.keys(services);
    }

    function getService(name) {
        return services[name];
    }

    function get(serviceName, version_) {
        const version = version_ || 'default';
        if (serviceName in cache) {
            if (version in cache[serviceName]) {
                if (cache[serviceName][version] === INSTANCIATING) {
                    throw 'Cyclic dependency on ' + serviceName + ' version ' + version;
                }
                return cache[serviceName][version];
            }
        } else {
            if (!(serviceName in services)) {
                throw 'Service not found: ' + serviceName;
            }
            const current = cache[serviceName] = Object.create(null);
            if (!(version in services[serviceName])) {
                throw 'Version of ' + serviceName + ' was not found.';
            }
            current[version] = INSTANCIATING;
            return current[version] = init(services[serviceName][version]);
        }
    }

    function has(serviceName, version_) {
        const version = version_ || 'default';
        return serviceName in cache && version in cache[serviceName];
    }

    function init(service) {
        return invoke((service.injections||[]).concat([service.fn]));
    }

    function invoke(fn_, locals) {
        const fn = Array.isArray(fn_) ? fn_[fn_.length - 1] : fn_;
        const injections = Array.isArray(fn_) ? fn_.slice(0, fn_.length - 1) : [];
        let length = injections.length;
        while (length--) {
            const compiledInjection = compileInjection(injections[length]);
            if (!compiledInjection.module && locals && compiledInjection.serviceName in locals) {
                injections[length] = locals[compiledInjection.serviceName];
            } else {
                injections[length] = get(compiledInjection.serviceName, compiledInjection.module);
            }
        }
        return fn.apply(null, injections);
    }
};
