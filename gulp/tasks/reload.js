var gulp = require('gulp'),
    util = require('gulp-util'),
    argv = require('yargs').argv,
    livereload = require('gulp-livereload');

// note that while running the 'gulp serve' task,
//   the task 'gulp watch --live' (which invokes LiveReload) makes little sense.
//   'gulp serve', by itself, will reload the page.

// reload livereload

gulp.task('reload', function() {
    // only run livereload if arg '--live' is used
    if (argv.live !== undefined) {
        // notify livereload of change
        util.log('LiveReload reported:');
        livereload.changed('/');
    }
});

// start livereload server

gulp.task('reload-start', function() {
    // only run livereload if arg '--live' is used
    if (argv.live !== undefined) {
        livereload.listen();
    }
});
