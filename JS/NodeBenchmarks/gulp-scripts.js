const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test-node', () =>
    gulp.src('**/*.nodespec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine({
            errorOnFail: false
        }))
);
module.exports = 'test-node';