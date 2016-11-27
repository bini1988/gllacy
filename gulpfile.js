'use strict';

var gulp = require('gulp');
var less = require("gulp-less");
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var strip = require('gulp-strip-css-comments');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var server = require('browser-sync').create();
var uglify = require("gulp-uglifyjs");

gulp.task('style', function() {
  return gulp.src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
      'last 3 versions',
      '> 2%',
      'ie >= 10'
      ], cascade: true
    }))
    .pipe(strip())
    .pipe(gulp.dest('css'))
    .pipe(strip({ preserve: false }))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});

gulp.task('server', ['style'], function() {
  server.init({
    server: '.',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});

gulp.task("scripts", function() {
  return gulp.src("js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("js"));
});
