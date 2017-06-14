(function (context, exports) {
    context.MAX_LENGTH = 599;
    context.cMath = require('./cpu')(exports);
    context.cMath.utils = require('./cpu')({});
})(typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null, module.exports = {});// jshint ignore:line