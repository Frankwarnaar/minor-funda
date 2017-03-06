/*jshint esversion: 6 */

const babel     = require('gulp-babel'),
	browserSync = require('browser-sync'),
	gulp        = require('gulp'),
	gutil       = require('gulp-util'),
	image       = require('gulp-image'),
	less        = require('gulp-less'),
	plumber     = require('gulp-plumber'),
	watch       = require('gulp-watch');

/* ============================================================
	Main tasks
   ============================================================ */

gulp.task('default', ['watch', 'browser-sync']);

/* ============================================================
	Configuration
   ============================================================ */

const config = {
	assetsPath: 'assets',
	distPath: 'dist',
	debug: true
};

gulp.task('watch', ['watch:html', 'watch:js', 'watch:less']);

gulp.task('watch:less', ['less'], () => {
	return gulp.watch(config.assetsPath + '/styles/**/*.less', ['less']);
});

gulp.task('watch:js', ['js'], () => {
	return gulp.watch([`${config.assetsPath}/js/*.js`, `${config.assetsPath}/js/**/*.js`], ['js']);
});

gulp.task('watch:html', () => {
	return gulp.watch(['*.html']).on('change', browserSync.reload);
});

const handleError = function(err) {
	gutil.log(err);
	browserSync.notify('An error occured!');
	this.emit('end');
};

/* ============================================================
	Less
   ============================================================ */

gulp.task('less', () => {
	return gulp.src(config.assetsPath + '/styles/app.less')
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(less())
		.pipe(gulp.dest(config.distPath + '/css'))
		.pipe(browserSync.stream());
});

/* ============================================================
	Javascript
   ============================================================ */

gulp.task('js', () => {
	return gulp.src([`${config.assetsPath}/js/*.js`, `${config.assetsPath}/js/**/*.js`])
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(babel({
			plugins: ["transform-remove-strict-mode"]
		}))
		.pipe(gulp.dest(config.distPath + '/js'))
		.pipe(browserSync.stream());
});

/* ============================================================
	Browser-sync
   ============================================================ */

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

/* ============================================================
	Image compression
   ============================================================ */

gulp.task('images', () => {
  gulp.src(config.assetsPath + '/img/**/*')
	.pipe(image())
	.pipe(gulp.dest(config.distPath + '/img'));
});