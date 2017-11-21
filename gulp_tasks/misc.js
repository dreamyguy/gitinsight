const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const flatten = require('gulp-flatten');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('move', move);
gulp.task('other', other);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function move() {
  return gulp.src('./web.config')
    .pipe(flatten())
    .pipe(gulp.dest(conf.paths.dist));
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}
