const testNode = require('./JS/NodeBenchmarks/gulp-scripts');
const gulp = require('gulp');
const through = require('through2');


gulp.task('test', function () {
    const moduleLoader = require('./JS/Module');
    return gulp.src('JS/**/*.md.js')
        .pipe(through.obj(function (chunk, enc, cb) {
            require(chunk.path);
            cb(null, chunk);
        }))
        .on('end', function () {
            moduleLoader.bootstrap({
                mode: 'test'
            });
        });

});
gulp.task('testNode', [testNode]);
