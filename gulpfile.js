var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src(['app/libs/*.js', 'app/js/main.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("app/js/*.js").on('change', browserSync.reload);
});
