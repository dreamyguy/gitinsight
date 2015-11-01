var gulp = require('gulp'),
    util = require('gulp-util'),
    argv = require('yargs').argv,
    livereload = require('gulp-livereload');

// reload livereload
gulp.task('reload', function() {
    if (argv.live !== undefined) {
        // notify livereload of change
        util.log('Livereload reported:');
        livereload.changed('/');
    }
});

// start livereload server
gulp.task('reload-start', function() {
    if (argv.live !== undefined) {
        livereload.listen();
    }
});
