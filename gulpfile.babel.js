import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import minify from 'gulp-minify'
import gls from 'gulp-live-server'

const srcFiles = 'src/**/*.js'
const backendFiles = 'src/backend/**/*.js'
const frontendFiles = 'src/frontend/**/*.js'
const testsFiles = 'test/**/*.js'
const buildDist = (folderName) => `dist/${folderName}`
 
gulp.task('lint', () => {
  return gulp.src([testsFiles, srcFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})

gulp.task('transpile', () => {
  gulp.src(backendFiles).pipe(babel()).pipe(gulp.dest(buildDist('backend')))

  gulp.src(frontendFiles).pipe(babel()).pipe(uglify()).pipe(gulp.dest(buildDist('frontend')))
})

gulp.task('transpile:watch', () => gulp.watch(srcFiles, ['transpile']))

gulp.task('mongo:start', () => {
  var exec = require('child_process').exec
  exec('mongod --dbpath mongo_data')
})

gulp.task('start:watch', ['mongo:start', 'transpile:watch'], () => {
  const server = gls.new(['--', buildDist('backend/server.js')])
  
  server.start()
})