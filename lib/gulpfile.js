var gulp = require('gulp');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var bower = require('bower');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['../sass/*.scss'],
  lint: ['../app/**/*.js']
};

gulp.task('default', ['lint']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('../styles/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('../styles/'))
    .on('end', done);
});

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      fallback: '../index.html',
      livereload: true,
      open: true,
      directoryListing: {
        enable: false,
        path: '../'
      }
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.lint, ['lint']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
