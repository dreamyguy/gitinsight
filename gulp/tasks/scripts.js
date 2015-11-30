var gulp = require('gulp'),
    config = require('../config').path,
    watch = require('./watch'),
    bower = require('main-bower-files'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    filter = require('gulp-filter'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    util = require('gulp-util'),
    header = require('gulp-header'),
    glob = require('glob'),
    merge = require('merge-stream'),
    _ = require('lodash');

// Get all bower files from bower.json based upon `main`-attribute in the
// package bower-file.
// Filters them for js-files, as this will also return css-files.
//
// NB: Will require overrides in bower.json if repo it downloads does not
// supply its own bower file with `main`-attribute.

var bowerFiles = _.filter(bower(), function(file) {
    return /\.js$/.test(file);
});

// Output source globs and incudes bower files if set

var files = function(source) {
    var src = source.vendor;
    if (source.bower) {
        src = src.concat(bowerFiles);
    }
    src = src.concat(source.src);
    return src;
};

// Processing JS-files:
// - concatenates and uglifies all files in stream
// - writes header with copyright notice
// - prints filesize to console
// - writes it all to destination folder
// - calls eventual callback

var process = function(source, type, cb) {
    if (source.bower) {
        source.vendor = source.vendor.concat(bowerFiles);
    }
    return gulp.src(source.vendor.concat(source.src))
        .pipe(concat(source.dist))
        .pipe(uglify({
            output: {
                beautify: true
            }
        }))
        .pipe(header(config.banner))
        .pipe(gulp.dest(config.scripts.dist))
        .pipe(size({
            'showFiles': true
        }))
    cb();
};

// Lints all JS files

gulp.task('scripts-lint', function() {
    return gulp.src(
            config.scripts.src.blocking.src.concat(config.scripts.src.async.src)
        )
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

// Initiates scripts processing based on configs.

gulp.task('scripts', ['scripts-lint'], function(cb) {
    for (var key in config.scripts.src) {
        source = config.scripts.src[key];
        process(source, key, function() {});
    }
    return cb();
});

// Shorthand for blocking js content

gulp.task('scripts-blocking', ['scripts-lint'], function() {
    return process(config.scripts.src.blocking, 'blocking', function() {});
});

// Shorthand for async js content

gulp.task('scripts-async', ['scripts-lint'], function() {
    return process(config.scripts.src.async, 'async', function() {});
});

// Initiates watching of scripts and processing based on configs.

gulp.task('scripts-watch', function() {
    for (var key in config.scripts.src) {
        source = config.scripts.src[key];
        watch('scripts-' + key, files(source), true);
    }
});
