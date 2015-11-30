var gulp = require('gulp'),
    config = require('../config').path.data,
    watch = require('./watch'),
    flatten = require('gulp-flatten');

// Copy data
gulp.task('data', function() {
    return gulp.src(config.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.dist));

});

// runs copying of data with watch
gulp.task('data-watch', function() {
    watch('data', config.src, false);
});
