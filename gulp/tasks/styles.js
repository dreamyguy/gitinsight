var gulp = require('gulp'),
    config = require('../config').path,
    bower = require('main-bower-files'),
    watch = require('./watch'),
    mixer = require('./mixer'),
    clean = require('./clean'),
    lazypipe = require('lazypipe'),
    sass = require('gulp-sass'),
    header = require('gulp-header'),
    util = require('gulp-util'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    runSequence = require('run-sequence'),
    _ = require('lodash'),
    gcmq = require('gulp-group-css-media-queries'),
    cssmin = require('gulp-cssmin'),
    run = require('run-sequence');

// Get all bower files from bower.json based upon `main`-attribute in the
// package bower-file.
// Filters them for styles, as this will also return JS-files.
//
// NB: Will require overrides in bower.json if repo it downloads does not
// supply its own bower file with `main`-attribute.

var bowerFiles = _.filter(bower(), function(file) {
    return /\.(css|scss)$/.test(file);
});

// Lazypipe for SASS compilation.
//
// Setup a pre init pipe to handle compass compilation. Generates  sourcemaps.

var process = lazypipe()
    .pipe(sass, {
        includePaths: config.styles.imports,
        outputStyle: 'nested'
    })
    .pipe(gcmq)
    .pipe(cssmin);

// base for styles (taken from config)

var stylesBase = bowerFiles.concat(
        config.styles.base.src, config.styles.modules.src
    );

// Generate imports and save them to temp path for sass handling.
//
// Uses `mixer()` to reference all files found in source base with imports
// in a sass-file for easy sass compiling.

gulp.task('styles-generate-imports', ['clean-temp'], function() {
    return gulp.src(stylesBase, {
            read: false
        })
        // See mixer()
        .pipe(mixer(config.styles.main.temp.file))
        .pipe(gulp.dest(config.styles.main.temp.path));
});

// Styles task.
//
// Setup sources, sends the pipe through process, adds header and saved to
// destination.

gulp.task('styles-compile', function() {
    return gulp.src(
        config.styles.main.temp.path + config.styles.main.temp.file
        )
        // sourcemaps - initialise
        .pipe(sourcemaps.init())
        // Sends pipe to pre-inited lazypipe()
        .pipe(process())
        // Writes a header based on template in config-template
        .pipe(header(config.banner))
        .pipe(size({
            'showFiles': true
        }))
        // sourcemaps - output
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.styles.dist));
});

// Styles task to run all required tasks in sequence.

gulp.task('styles', function(cb) {
    return run(
        ['styles-generate-imports'],
        ['styles-compile'],
        cb);
});

//  Watch task for styles.

gulp.task('styles-watch', function() {
    watch('styles', config.styles.watchfiles, false);
});
