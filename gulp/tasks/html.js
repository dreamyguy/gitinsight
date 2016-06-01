var gulp = require('gulp'),
    config = require('../config').path.html,
    htmlmin = require('gulp-htmlmin'),
    watch = require('./watch'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten');

// copy html

gulp.task('html', function() {
    return gulp.src(config.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.dist))
        .pipe(htmlmin())
        .pipe(rename({
            extname: '.min.html'
        }))
        .pipe(gulp.dest(config.dist));

});

// runs copying of html with watch

gulp.task('html-watch', function() {
    watch('html', config.src, false);
});
