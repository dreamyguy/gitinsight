var gulp = require('gulp'),
    config = require('../config').path.images,
    clean = require('./clean'),
    flatten = require('gulp-flatten'),
    size = require('gulp-size'),
    watch = require('./watch'),
    path = require('path'),
    minify = require('gulp-imagemin');

// copy all images from sources to destination folder for

gulp.task('images-copy', function() {
    return gulp.src(config.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.dist));
});

// minify all images in destination folder (overwriting minified with non-minified)
// must be run after 'styles' to minify generated sprites

gulp.task('images-minify', ['images-copy'], function() {
    return gulp.src(config.dist + '*.*')
        .pipe(minify())
        .pipe(size({
            title: 'images'
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('images', function() {
    gulp.start('images-minify');
});

gulp.task('images-watch', function() {
    watch('images', config.src, false);
});
