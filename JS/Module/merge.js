const compileInjection = require('./compileInjection');
module.exports = merge;
const SPECIAL_KEYS = {
    unitTesting: '$$unitTesting',
    benchmarking: '$$benchmarking'
};

function merge(dest, source) {
    if (typeof source === 'function') {
        assertAndWarn(dest, 'default');
        dest.default = make(source);
        dest.$$keys.push('default');
        return;
    } if (Array.isArray(source)) {
        assertAndWarn(dest, 'default');
        dest.$$keys.push('default');
        dest.default = make(source);
        return;
    }
    const keys = Object.keys(source);
    let pos = keys.length;
    while (pos--) {
        const cur = keys[pos];
        if (SPECIAL_KEYS[cur]) {
            dest[SPECIAL_KEYS[cur]] = source[cur];
        } else {
            assertAndWarn(dest, cur);
            dest.$$keys.push(cur);
            dest[cur] = make(source[cur]);
        }
    }
}

function assertAndWarn(obj, key) {
    if (key in obj) {
        console.warn('Overriding service', obj.$$name, 'at', key);
    }
}

function make(source_) {
    const source = normalize(source_);
    const fn = source.fn[source.fn.length - 1];
    const override = source.override;
    let injections = source.fn.slice(0, source.fn.length - 1);
    let pos = injections.length;
    while (pos--) {
        const cur = compileInjection(injections[pos]);
        if (override && cur.serviceName in override) {
            cur.module = override[cur.serviceName];
        }
        injections[pos] = cur;
    }
    return {
        injections: injections,
        fn: fn
    };
}

function normalize(val) {
    if (!val) {
        throw 'Invalid input for normalization';
    }

    if (Array.isArray(val)) {
        return {
            fn: val
        };
    }
    const type = typeof val;
    if (type === 'object') {
        return val;
    }

    if (type === 'function') {
        return {
            fn: [val]
        };
    }

    throw 'Invalid input for normalization';
}

