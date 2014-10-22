'use strict';

//requirement
var gulp = require('gulp');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');

//default task
gulp.task('default', ['serve', 'watch'], function() {

});

//run test
gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(notify({
      title: 'Task: Test',
      message: 'Test-runner reloaded.'
    }));
});

//browserSync
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
});

//watch files
gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!test/**/*.*'], ['scripts']);
  gulp.watch('test/tests.js', ['test', 'reload']);
});

//sass compile
gulp.task('styles', function() {
  return gulp.src(['sass/**/*.scss'])
    .pipe(compass({
      css: 'demo/css',
      sass: 'demo/sass',
      image: 'demo/images'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('demo/css'))
    .pipe(notify({
      title: 'Task: Style',
      message: 'CSS compiled.'
    }));
});

//script build
gulp.task('scripts', function() {
  return gulp.src(['src/jquery.screenplay.js'])
    .pipe(jshint())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('src'))
    .pipe(notify({
      title: 'Task: Script',
      message:'Javascript builded.'
    }));
});

//live reload
gulp.task('reload', function() {
  browserSync.reload();
});