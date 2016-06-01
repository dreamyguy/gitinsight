var gulp = require('gulp'),
    config = require('../config'),
    watch = require('./watch'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    _ = require('lodash'),
    size = require('gulp-size'),
    minify = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    flatten = require('gulp-flatten'),
    util = require('gulp-util');

// copy fonts

gulp.task('fonts', function() {
    return gulp.src(config.path.fonts.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.path.fonts.dist));
});

// concatenate and generate font icons

gulp.task('fonts-generate', function() {
    return gulp.src(config.path.fonts.icons.src)
        .pipe(iconfont({
            fontName: config.path.fonts.icons.name + config.pkg.version, // required
            formats: ['ttf', 'eot', 'woff'] // default, 'woff2' and 'svg' are available
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g.
          //util.log(glyphs, options);
            gulp.src(config.path.fonts.icons.template.src)
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: config.path.fonts.icons.name + config.pkg.version,
                    fontPath: config.path.fonts.icons.path,
                    className: 'icon'
                }))
               .pipe(gulp.dest(config.path.fonts.icons.template.dist));
        })
        .pipe(gulpif('*.svg', minify()))
        .pipe(size({
            title: 'icons'
        }))
        .pipe(gulp.dest(config.path.fonts.icons.dist));
});

// runs copying of fonts with watch

gulp.task('fonts-watch', function() {
    watch('fonts', config.path.fonts.src, false);
});
