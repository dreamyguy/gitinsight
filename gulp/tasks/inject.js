var gulp = require('gulp'),
    config = require('../config').path,
    watch = require('./watch'),
    htmlclean = require('gulp-htmlclean'),
    inject = require("gulp-inject");

// injects CSS to head-template
gulp.task('inject', function() {
    return gulp.src([config.injects.head.src])
        .pipe(inject(gulp.src(config.styles.distfiles.main, {
            read: false
        })))
        .pipe(htmlclean())
        .pipe(gulp.dest(config.injects.head.dist));
});

gulp.task('inject-watch', function() {
    watch('inject', config.injects.head.src, false);
});
