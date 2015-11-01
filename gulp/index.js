var gulp = require('gulp'),
    run = require('run-sequence'),
    requireDir = require('require-dir');

// load config
var config = require('./config');

// load all tasks
var dir = requireDir('./tasks');

// watch tasks merged into one
gulp.task('watch', function(cb) {
    return  run([
               'scripts-watch',
               'styles-watch',
               'inject-watch',
               'html-watch',
               'templates-watch'
            ],
            cb);
});

// run compile only once clean has completed
gulp.task('compile', ['clean'], function(cb) {
    return run(['scripts-blocking', 'scripts-async', 'styles'],
        'inject',
        cb);
});

// run templates only once compile has completed
gulp.task('templates', ['compile'], function(cb) {
    // request only the last template task as all tasks are run on series
    return run('templates-symlink',
        cb);
});

gulp.task('default', function(cb) {
    return run('templates',
        cb);
});
