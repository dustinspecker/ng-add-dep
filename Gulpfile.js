'use strict';
var eslint = require('gulp-eslint')
  , gulp = require('gulp')
  , istanbul = require('gulp-istanbul')
  , jscs = require('gulp-jscs')
  , jshint = require('gulp-jshint')
  , mocha = require ('gulp-mocha')

  , srcFiles = 'index.js'
  , testFiles = 'test.js';

gulp.task('lint', function () {
  return gulp.src([srcFiles, testFiles])
    .pipe(eslint())
    .pipe(eslint.formatEach('./node_modules/eslint-path-formatter'))
    .pipe(eslint.failOnError())
    .pipe(jscs())
    .pipe(jshint());
});

gulp.task('test', ['lint'], function (cb) {
  gulp.src([srcFiles, '!' + testFiles])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src([testFiles])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
