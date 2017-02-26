"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("gulp-autoprefixer");
var strip = require("gulp-strip-css-comments");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

var minify = require("gulp-minify");

var spritesmith = require("gulp.spritesmith");
var imagemin = require("gulp-imagemin");

var rename = require("gulp-rename");
var del = require("del");
var run = require("run-sequence");


/* CSS */

gulp.task("style", function() {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
      "last 3 versions",
      "> 2%",
      "ie >= 10"
      ], cascade: true
    }))
    .pipe(strip())
    .pipe(gulp.dest("css"))
    .pipe(strip({ preserve: false }))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("style-build", function() {

  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
      "last 3 versions",
      "> 2%",
      "ie >= 10"
      ], cascade: true
    }))
    .pipe(strip())
    .pipe(gulp.dest("css"))
    .pipe(strip({ preserve: false }))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});


/* JS */

gulp.task("scripts-build", function() {
  return gulp.src("js/**/*.js")
    .pipe(minify({
      noSource: 1,
      ext: { min:".js" }
    }))
    .pipe(gulp.dest("build/js"));
});


/* IMG */

gulp.task("img-build", function() {
  return gulp.src(["img/**/*.{png,jpg,gif,svg}", "!img/sprite-icons{,/**}"])
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest("build/img"));
});


gulp.task("sprite", function() {

  var sprite = gulp.src("img/sprite-icons/*.*")
    .pipe(spritesmith({
            imgName: "../img/sprite.png",
            cssName: "sprite.less"
    }));

    sprite.img.pipe(gulp.dest("img"));
    sprite.css.pipe(gulp.dest("less/global"));
});


/* Dev server */

gulp.task("server", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});



/* Build project */

gulp.task("copy-files", function() {

  return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "*.html"
    ], {
      base : "."
    })
    .pipe(gulp.dest("build"));
});


gulp.task("clean", function() {
  return del("build");
});


gulp.task("build", function(fn) {

  run("clean",
    "copy-files",
    "style-build",
    "scripts-build",
    "img-build",
    fn);
});
