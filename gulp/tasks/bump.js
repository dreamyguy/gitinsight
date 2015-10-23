var gulp = require('gulp'),
    util = require('gulp-util'),
    semver = require('semver'),
    bump = require('gulp-bump'),
    argv = require('yargs').argv,
    config = require('../config');

var newVer = '0.0.0';

// increment verison
var incrementVersion = function(version, callback) {
    var releaseType = 'patch';
    if (argv.major) releaseType = 'major';
    if (argv.premajor) releaseType = 'premajor';
    if (argv.minor) releaseType = 'minor';
    if (argv.preminor) releaseType = 'preminor';
    if (argv.patch) releaseType = 'patch';
    if (argv.prepatch) releaseType = 'prepatch';
    if (argv.prelease) releaseType = 'prelease';

    version = semver.inc(version, releaseType);

    return callback(version);
};

// bump package version based on semver, using files from config.
gulp.task('bump', function() {

    // Increment version, with patch as default (X.0.patch)
    incrementVersion(config.pkg.version, function(version) {

        util.log(
            'Current version is',
            util.colors.magenta(config.pkg.version),
            'and it will be bumped to',
            util.colors.green(version)
        )
  
        gulp.src(config.path.version)
            .pipe(bump({
                version: version
            }))
            .pipe(gulp.dest('./'))
    });

});
