var gulp = require('gulp');
var jade = require('gulp-jade');
var jadeOptions = require('./jadeOptions');

gulp.task('templates', function() {
  gulp.src([
    'src/templates/*.jade',
    '!src/templates/layout.jade'
  ])
  .pipe(jade(jadeOptions))
  .pipe(gulp.dest('dist/'))
});