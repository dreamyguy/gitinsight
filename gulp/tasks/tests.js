var gulp = require('gulp'),
    config = require('../config').path.tests,
    flatten = require('gulp-flatten'),
    run = require('run-sequence');


// copy browser tests to their rightful folders

gulp.task('tests-browser', function() {
    return gulp.src(config.browser.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.browser.dist));
});

// copy all tests in one task

gulp.task('tests', function(cb) {
    return run('tests-browser', cb);
});

// runs copying of tests with watch

gulp.task('tests-watch', function() {
    watch('tests', config.browser.src, false);
});
