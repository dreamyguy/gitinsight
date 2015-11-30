var gulp = require('gulp'),
    config = require('../config').path.fonts,
    watch = require('./watch'),
    flatten = require('gulp-flatten');

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src(config.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.dist));

});

// runs copying of fonts with watch
gulp.task('fonts-watch', function() {
    watch('fonts', config.src, false);
});
