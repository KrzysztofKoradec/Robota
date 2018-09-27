var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var wait = require('gulp-wait');


// SASS task
// compiles sass into css
gulp.task('sass', function() {
  return gulp.src('_NEW_VERSION/assets/sass/style.scss')
  .pipe(wait(100)) // becouse VS Code was making some problems with compiling on save
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('_NEW_VERSION/assets/css'))
  .pipe(browserSync.reload({
    stream: true
  })) 
});


// prefixCss task
gulp.task('prefixCss', function() {
  return gulp.src('_NEW_VERSION/assets/css/style.css')
  .pipe(autoprefixer({
    browsers: [ "last 3 versions", "iOS > 7", "Safari > 5", "Explorer >= 11" ]
  }))
  .pipe(gulp.dest('_NEW_VERSION/assets/css'));
});


// browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: '_NEW_VERSION',
    notify: false
  });
});


// Watch task
gulp.task('watch', function (){
  gulp.watch('_NEW_VERSION/assets/sass/**/*.scss', ['sass']);
  gulp.watch('_NEW_VERSION/*.html', browserSync.reload);
  gulp.watch('_NEW_VERSION/email_templates/*.*', browserSync.reload);
  gulp.watch('_NEW_VERSION/assets/js/*.js', browserSync.reload);
});



// Build task
gulp.task('build', function (callback) {
  runSequence('sass',
    ['prefixCss'],
    callback
  );
});


// Default task
gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  );
});
