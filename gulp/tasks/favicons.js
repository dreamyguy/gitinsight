var gulp = require('gulp'),
    favicons = require('gulp-favicons'),
    config = require('../config.js'),
    util = require('gulp-util');

// PS: this task will only run with node >= 4.0 atm

gulp.task("favicons-compile", function () {
    return gulp.src(config.path.favicons.icons.src).pipe(favicons({
        appName: config.path.favicons.settings.appName,
        appDescription: config.path.favicons.settings.appDescription,
        developerName: config.path.favicons.settings.developer,
        developerURL: config.path.favicons.settings.developerURL,
        background: config.path.favicons.settings.background,
        path: config.path.favicons.public,
        url: config.path.favicons.settings.URL,
        version: config.path.favicons.settings.version,
        logging: config.path.favicons.settings.logging,
        html: config.path.favicons.icons.template,
        pipeHTML: true,
        replace: true,
        icons: {
            favicons: true,
            appleStartup: false,
            firefox: false,
            opengraph: false
        }
    }))
    .on("error", util.log)
    .pipe(gulp.dest(config.path.favicons.dist));
});

gulp.task('favicons', function() {
    gulp.start('favicons-compile');
});
