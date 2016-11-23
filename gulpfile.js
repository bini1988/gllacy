'use strict';

var gulp = require('gulp');
var less = require("gulp-less");
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var prefix = require('gulp-autoprefixer');
var strip = require('gulp-strip-css-comments');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var server = require('browser-sync').create();
var uglify = require("gulp-uglifyjs");

gulp.task('style', function() {
  return gulp.src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    //.pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
    //.pipe(prefix('last 2 versions'))
    /*.pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]})
    ]))*/
    .pipe(strip())
    .pipe(gulp.dest('css'))
    .pipe(strip({ preserve: false }))
    //.pipe(minify())
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

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./css/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
          ]})
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(rename('style.pref.css'))
        .pipe(gulp.dest('./css'));
});
