var gulp = require('gulp'),
    config = require('../config').path.templates,
    watch = require('./watch'),
    clean = require('./clean'),
    flatten = require('gulp-flatten'),
    jade = require('gulp-jade'),
    jadeOptions = require('./../../jadeOptions');

// templates task
gulp.task('templates', ['clean-templates'], function() {
    return gulp.src(config.src)
        .pipe(flatten())
        .pipe(jade(jadeOptions))
        .pipe(gulp.dest(config.dist));
});

// watch templates
gulp.task('templates-watch', function() {
    watch(
        'templates',
        config.src.concat(config.widgets.src),
        config.src.concat(config.strapr.src),
        false
    );
});