var gulp = require('gulp'),
    root = require('../config').rootPath,
    argv = require('yargs').argv,
    util = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// 'gulp serve' should be run on its own bash window.
//   the task will start a server but for it to reload on changes
//   it has to run alongside 'gulp watch', which should also be run
//   from its own bash window.
// note that while running the 'gulp serve' task,
//   the task 'gulp watch --live' (which invokes LiveReload) makes little sense.
//   'gulp serve', by itself, will reload the page.

// serve the application
gulp.task('serve', function() {
    // serve files from the project's root
    browserSync.init({
        server: {
            baseDir: root.templates
        },
        browser: "google chrome"
    });
    // watch for changes and refresh all bS sessions
    gulp.watch(root.templates + "index.html").on("change", browserSync.reload);
});
