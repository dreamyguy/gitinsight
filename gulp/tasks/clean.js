// tasks for cleaning distribution and temp folders
var gulp = require('gulp'),
    config = require('../config').rootPath,
    del = require('del');

// clean distribution folder
gulp.task('clean-dist', function(cb) {
    del([
        config.dist
    ], cb);
});

// clean temp folder
gulp.task('clean-temp', function(cb) {
    del([
        config.temp
    ], cb);
});

// clean temp jade folder
gulp.task('clean-temp-jade', function(cb) {
    del([
        config.tempJade
    ], cb);
});

// clean templates folder
gulp.task('clean-templates', function(cb) {
    del([
        config.templates
    ], cb);
});

// clean distribution folder
gulp.task('clean', ['clean-dist', 'clean-temp', 'clean-templates']);

