const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();

// Sass task
gulp.task('scss', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});


// JavaScript task
gulp.task('js', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js', 
    'node_modules/jquery-parallax.js/parallax.min.js',
    'node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js',
    'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
    'src/js/dropdown.js',
    'src/js/showMaterial.js',
    'src/js/main.js',
  ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Images task
gulp.task('images', function() {
  return gulp.src('src/images/**/*.*')
	.pipe(webp())
	.pipe(gulp.dest('dist/images'));
});

// SVG task - copy SVG files without webp conversion
gulp.task('svg', function() {
  return gulp.src('src/images/**/*.svg')
	.pipe(gulp.dest('dist/images'));
});


// Fonts task
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('dist/fonts'));
});

// Nunjucks
gulp.task('nunjucks', (done) => {
  gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({
      path: ['src/templates/'],
    }))
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      browserSync.reload();
      done();
    });
});


// Serve task
gulp.task('serve', () => {
  browserSync.init({
    server: './dist',
    port: 3000,
    notify: false,
    open: true,
    // Додаткові налаштування для кращого оновлення
    injectChanges: true,
    reloadDelay: 0,
    reloadDebounce: 0,
  });

  gulp.watch('src/templates/**/*.njk', gulp.series('nunjucks'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/images/**/*.*', gulp.series('images', 'svg'));
});

// Default task - now properly starts server
gulp.task('default', gulp.series('nunjucks', 'scss', 'js', 'images', 'svg', 'serve'));
