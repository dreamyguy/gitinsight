var gulp = require('gulp'),
    config = require('../config').path.templates,
    watch = require('./watch'),
    clean = require('./clean'),
    util = require('gulp-util'),
    flatten = require('gulp-flatten'),
    jade = require('gulp-jade'),
    jadeOptions = require('./../../jadeOptions');

// flatten all jade templates so that they are compiled from one place
gulp.task('templates-jade-flatten', ['clean-temp-jade'], function() {
    return gulp.src(config.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.flatten.dist));
});

// compile jade templates to html
gulp.task('templates-jade', ['templates-jade-flatten'], function() {
    return gulp.src(config.flatten.src)
        .pipe(flatten())
        .pipe(jade(jadeOptions))
        .pipe(gulp.dest(config.dist));
});

// watch templates
gulp.task('templates-watch', function() {
    watch(
        'templates',
        false
    );
});
