var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),
    runSequence = require('run-sequence'),
    _ = require('lodash');

// watcher for files, with logging on changes
module.exports = function(name, source) {
    var watcher = gulp.watch(source, function() {
        if (name === 'templates') {
            return runSequence(name, 'reload');
        } else {
            return runSequence(name, 'templates', 'reload');
        }
    });
    gulp.start('reload-start');
    watcher.on('ready', function(watcher) {
        util.log(
            util.colors.cyan(name),
            'added',
            util.colors.cyan(_.size(watcher._pollers)),
            'files from pipe'
        );
    });
    watcher.on('change', function(file) {
        util.log(
            util.colors.cyan(name),
            'saw',
            util.colors.magenta(path.relative(process.cwd(), file.path)),
            'was',
            file.type
        );
    });
};
