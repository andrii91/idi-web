const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');

// Nunjucks
gulp.task('nunjucks', () => {
  return gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({
      path: ['src/templates/'],
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// SCSS + Bootstrap + Slick
gulp.task('scss', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// JS + Slick
gulp.task('js', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'src/js/main.js',
  ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.*')
	.pipe(webp())
	.pipe(gulp.dest('dist/images'));
});

// Fonts task
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('dist/fonts'));
});

// Server
gulp.task('serve', () => {
  browserSync.init({
    server: './dist',
  });

  gulp.watch('src/templates/**/*.njk', gulp.series('nunjucks'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/images/**/*.', gulp.series('images'));
});

gulp.task('default', gulp.parallel('nunjucks', 'images', 'scss', 'js', 'serve'));
