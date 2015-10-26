var gulp = require('gulp'),
    run = require('run-sequence'),
    p = require('gulp-load-plugins')();

// load config
var config = require('./config');

// Load all tasks
var bump = require('./tasks/bump'),
    clean = require('./tasks/clean'),
    html = require('./tasks/html'),
    inject = require('./tasks/inject'),
    styles = require('./tasks/styles'),
    templates = require('./tasks/templates');

// watch tasks merged into one
gulp.task('watch', function(cb) {
    return  run([
               'styles-watch',
               'inject-watch',
               'html-watch',
               'templates-watch'
            ],
            cb);
});

// run compile only once clean has completed
gulp.task('compile', ['clean'], function(cb) {
    return run(['styles'],
        'inject',
        cb);
});

// run templates only once compile has completed
gulp.task('templates', ['compile'], function(cb) {
    return run('templates-jade',
        cb);
});

gulp.task('default', function(cb) {
    return run('templates',
        cb);
});
