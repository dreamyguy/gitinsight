var gulp = require('gulp'),
    config = require('../config').path,
    watch = require('./watch'),
    htmlclean = require('gulp-htmlclean'),
    inject = require("gulp-inject");


var asyncJS = function(filepath, file, i, length) {
    return '<script src="' + filepath + '" async></script>';
};

// injects JS blocking and async as well as CSS to head-template

gulp.task('inject', function() {
    return gulp.src([config.injects.head.src])
        .pipe(inject(gulp.src(config.scripts.distfiles.blocking, {
            read: false
        }), {
            starttag: '<!-- inject:blocking:{{ext}} -->'
        }))
        .pipe(inject(gulp.src(config.scripts.distfiles.async, {
            read: false
        }), {
            starttag: '<!-- inject:async:{{ext}} -->',
            transform: asyncJS
        }))
        .pipe(inject(gulp.src(config.styles.distfiles.main, {
            read: false
        })))
        .pipe(htmlclean())
        .pipe(gulp.dest(config.injects.head.dist));
});

gulp.task('inject-watch', function() {
    watch('inject', config.injects.head.src, false);
});
