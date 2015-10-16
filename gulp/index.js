var gulp = require('gulp'),
    p = require('gulp-load-plugins')();

// load config
var config = require('./config');

gulp.task('default', function() {
    p.util.log(
        p.util.colors.green('gulp just ran')
    );
});
