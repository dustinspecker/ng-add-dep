'use strict';
import babel from 'gulp-babel';
import babelCompiler from 'babel-core';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';

const configFiles = './gulpfile.babel.js'
  , srcFiles = 'src/*.js'
  , testFiles = 'test.js'

  , destDir = './lib/';

gulp.task('clean', () => del(destDir));

gulp.task('lint', () => {
  return gulp.src([srcFiles, testFiles])
    .pipe(eslint())
    .pipe(eslint.formatEach('./node_modules/eslint-path-formatter'))
    .pipe(eslint.failOnError())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(jshint());
});

gulp.task('compile', ['lint'], () => {
  return gulp.src(srcFiles)
    .pipe(babel())
    .pipe(gulp.dest(destDir));
});

gulp.task('build', ['compile']);

gulp.task('test', ['build'], (cb) => {
  gulp.src([destDir + 'index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([testFiles])
        .pipe(mocha({
          compilers: {
            js: babelCompiler
          }
        }))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
