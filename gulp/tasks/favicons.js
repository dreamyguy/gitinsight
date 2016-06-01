var gulp = require('gulp'),
    favicons = require('gulp-favicons'),
    config = require('../config').path,
    util = require('gulp-util');

// PS: this task will only run with node >= 4.0 atm

gulp.task("favicons-compile", function () {
    return gulp.src(config.favicons.src).pipe(favicons({
        appName: config.favicons.settings.appName,
        appDescription: config.favicons.settings.appDescription,
        developerName: config.favicons.settings.developer,
        developerURL: config.favicons.settings.developerURL,
        background: config.favicons.settings.background,
        path: config.favicons.public,
        display: config.favicons.settings.display,
        orientation: config.favicons.settings.orientation,
        url: config.favicons.settings.URL,
        version: config.favicons.settings.version,
        logging: config.favicons.settings.logging,
        online: config.favicons.settings.online,
        html: config.favicons.settings.html,
        pipeHTML: config.favicons.settings.pipeHTML,
        replace: config.favicons.settings.replace,
        icons: {
            favicons: true,
            appleStartup: false,
            firefox: false,
            opengraph: false
        }
    }))
    .on("error", util.log)
    .pipe(gulp.dest(config.favicons.dist));
});

gulp.task('favicons', function() {
    gulp.start('favicons-compile');
});
