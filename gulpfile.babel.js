import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import gls from 'gulp-live-server'
import webpackStream from 'webpack-stream'
import webpack from 'webpack';
import mocha from 'gulp-mocha';

const srcFiles = 'src/**/*.js';
const backendFiles = 'src/backend/**/*.js';
const frontendFiles = 'src/frontend/**/*.js';
const testsFiles = 'test/**/*.js';
const buildDist = (folderName) => `dist/${folderName}`;
const protractor = require("gulp-protractor").protractor;


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

gulp.task('test-backend', () =>
  gulp.src('test/backend/*', {read: false})
    .pipe(mocha({reporter: 'nyan', compilers: 'js:babel-core/register', require: 'babel-polyfill', timeout: 120000}))
);

gulp.task('frontend-components', () =>
  gulp.src('test/frontend/*', {read: false})
    .pipe(mocha({reporter: 'nyan', compilers: 'js:babel-core/register', require: 'babel-polyfill', timeout: 120000}))
);

gulp.task('frontend-e2e', () => {}
  // gulp.src('./test/e2e/*.test.js')
  //   .pipe(protractor({
  //     configFile: "./protractor.conf.js",
  //     args: ['--baseUrl', 'http://127.0.0.1:3001']
  //   }))
  //   .on('error', function(e) { throw e })
);

gulp.task('frontend-all', ['frontend-components', 'frontend-e2e']);

gulp.task('all', ['test-backend', 'frontend-components', 'frontend-e2e']);

gulp.task('all-non-e2e', ['test-backend', 'frontend-components']);
