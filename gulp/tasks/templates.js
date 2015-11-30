var gulp = require('gulp'),
    config = require('../config').path.templates,
    root = require('../config').rootPath,
    path = require('path'),
    watch = require('./watch'),
    clean = require('./clean'),
    util = require('gulp-util'),
    flatten = require('gulp-flatten'),
    jade = require('gulp-jade'),
    jadeOptions = require('./../options/jade'),
    symlink = require('gulp-symlink');

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

// create symlink inside templates folder to dist files
//   so that template files can live in their own folder
gulp.task('templates-symlink', ['templates-jade'], function() {
    return gulp.src(root.dist)
        .pipe(symlink(path.join(root.templates, 'dist')));
});

// watch templates
gulp.task('templates-watch', function() {
    watch(
        'templates',
        config.src,
        false
    );
});
