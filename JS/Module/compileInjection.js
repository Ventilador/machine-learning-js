const state = {
    COLLECTING_INJECTION: 0,
    COLLECTING_FROM: 1,
    COLLECTING_MODULE: 2
};
module.exports = function compileInjection(val) {
    if (typeof val !== 'string' || !val.length) {
        throw 'Invalid injection';
    }
    let injection = '';
    let module = '';
    let myState = state.COLLECTING_INJECTION;
    for (let ii = 0, cur = val[ii]; ii < val.length; cur = val[++ii]) {
        switch (myState) {
            case state.COLLECTING_INJECTION:
                if (cur === ' ') {
                    myState = state.COLLECTING_FROM;
                } else if (cur === '@' || cur === '.') {
                    myState = state.COLLECTING_MODULE;
                } else {
                    injection += cur;
                }
                break;
            case state.COLLECTING_MODULE:
                module += cur;
                break;
            case state.COLLECTING_FROM:
                const toSkip = 'from ';
                for (let jj = 0; jj < toSkip.length; jj++) {
                    if (toSkip[jj] !== val[ii++] || ii === val.length) {
                        throw 'Invalid module name';
                    }
                }
                myState = state.COLLECTING_MODULE;
                break;
        }
    }
    return {
        serviceName: injection,
        module: module
    };
};
