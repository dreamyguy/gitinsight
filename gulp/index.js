var gulp = require('gulp'),
    run = require('run-sequence'),
    p = require('gulp-load-plugins')();

// load config
var config = require('./config');

// Load all tasks
var bump = require('./tasks/bump'),
    clean = require('./tasks/clean'),
    html = require('./tasks/html'),
    styles = require('./tasks/styles')
    templates = require('./tasks/templates');


// run tasks in a certain order
gulp.task('children', function(cb) {
    return run(['styles'],
        cb);
});

var compile = ['children', 'html', 'templates'];

// watch tasks merged into one
gulp.task('watch', function(cb) {
    return  run([
               'styles-watch',
               'templates-watch',
               'html-watch'
            ],
            cb);
});

gulp.task('default', function(cb) {
    return run('clean', compile,
        cb);
});
