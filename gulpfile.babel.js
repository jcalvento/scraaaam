import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import gls from 'gulp-live-server'
import webpackStream from 'webpack-stream'
import webpack from 'webpack';

const srcFiles = 'src/**/*.js';
const backendFiles = 'src/backend/**/*.js';
const frontendFiles = 'src/frontend/**/*.js';
const testsFiles = 'test/**/*.js';
const buildDist = (folderName) => `dist/${folderName}`;
 
gulp.task('lint', () => {
  return gulp.src([testsFiles, srcFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('transpile', () => {
  gulp.src(backendFiles).pipe(babel()).pipe(gulp.dest(buildDist('backend')));

  const webPackEntryPoint = './src/frontend/bootstrap.js'
  const webPackConfig = require('./webpack.config.js')
  
  return gulp.src(webPackEntryPoint)
    .pipe(webpackStream(webPackConfig, webpack))
    .pipe(gulp.dest(buildDist('frontend')))
});

gulp.task('transpile:watch', ['transpile'], () => gulp.watch(srcFiles, ['transpile']));

gulp.task('start:watch', ['transpile', 'transpile:watch'], () => {
  const server = gls.new(['--', buildDist('backend/server.js')]);
  
  return server.start()
});