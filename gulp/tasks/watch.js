var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),
    runSequence = require('run-sequence'),
    _ = require('lodash');

// watcher for files, with logging on changes

module.exports = function(name, source) {
    var watcher = gulp.watch(source, function() {
    //  return runSequence(name, 'reload');
        return runSequence('templates', 'reload'); // templates does the trick and keeps BrowserSync rolling
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
