const testNode = require('./JS/NodeBenchmarks/gulp-scripts');
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test', () =>
    gulp.src('**/*.spec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine({
            errorOnFail: false,
            captureExceptions: true
        })));
gulp.task('testNode', [testNode]);