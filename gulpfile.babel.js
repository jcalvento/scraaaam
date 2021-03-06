import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'
import webpackStream from 'webpack-stream'
import webpack from 'webpack';
import mocha from 'gulp-mocha';

const srcFiles = 'src/**/*.js';
const backendFiles = 'src/backend/**/*.js';
const testsFiles = 'test/**/*.js';
const buildDist = (folderName) => `dist/${folderName}`;
const protractor = require("gulp-protractor").protractor;
const exec = require('child_process').exec;
let server;

gulp.task('lint', () => {
  return gulp.src([testsFiles, srcFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('transpile', () => {
  gulp.src(backendFiles).pipe(babel()).pipe(gulp.dest(buildDist('backend')));

  const webPackEntryPoint = './src/frontend/bootstrap.js';
  const webPackConfig = require('./webpack.config.js');
  
  return gulp.src(webPackEntryPoint)
    .pipe(webpackStream(webPackConfig, webpack))
    .pipe(gulp.dest(buildDist('frontend')))
});

gulp.task('transpile:watch', ['transpile'], () => gulp.watch(srcFiles, ['transpile']));

const startServer = function() {
  server = gls.new(['--', buildDist('backend/server.js')]);

  return server.start()
};

gulp.task('start:watch', ['transpile:watch'], startServer);
gulp.task('start', ['transpile'], startServer);

gulp.task('test-backend', () =>
  gulp.src('test/backend/*', {read: false})
    .pipe(mocha({reporter: 'nyan', compilers: 'js:babel-core/register', require: 'babel-polyfill', timeout: 120000}))
);

gulp.task('frontend-components', () =>
  gulp.src('test/frontend/*', {read: false})
    .pipe(mocha({reporter: 'nyan', compilers: 'js:babel-core/register', require: 'babel-polyfill', timeout: 120000}))
);

gulp.task('frontend-e2e', () => {
  gulp.src('./test/e2e/*.test.js')
      .pipe(protractor({ 
        configFile: "./protractor.conf.js" 
      }))
      .on('error', function (e) {
        throw e
      });
});

gulp.task('frontend-all', ['frontend-components', 'frontend-e2e']);

gulp.task('all', ['test-backend', 'frontend-components', 'frontend-e2e']);

gulp.task('all-non-e2e', () =>
  exec('NODE_ENV=test nyc --require babel-core/register mocha --require babel-polyfill --compilers js:babel-register --recursive test/frontend test/backend')
);
