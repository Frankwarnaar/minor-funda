/*jshint esversion: 6 */

const babel     = require('gulp-babel'),
	browserSync = require('browser-sync'),
	bundler     = require('gulp-es6-module-bundler'),
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
gulp.task('build', ['disable-debug', 'less', 'js', 'images']);

/* ============================================================
	Configuration
   ============================================================ */

gulp.task('disable-debug', () => {
	config.debug = false;
});

const config = {
	assetsPath: 'assets',
	distPath: 'dist',
	debug: true
};

/* ============================================================
	Watch
   ============================================================ */

gulp.task('watch', ['watch:html', 'watch:js', 'watch:less', 'watch:images']);

gulp.task('watch:less', ['less'], () => {
	return gulp.watch(config.assetsPath + '/styles/**/*.less', ['less']);
});

gulp.task('watch:js', ['js'], () => {
	return gulp.watch([`${config.assetsPath}/js/*.js`, `${config.assetsPath}/js/**/*.js`], ['js']);
});

gulp.task('watch:html', () => {
	return gulp.watch(['*.html']).on('change', browserSync.reload);
});

gulp.task('watch:images', () => {
	return gulp.watch([`${config.assetsPatch}/img/*`, `${config.assetsPatch}/img/**/*`], ['images']);
});

/* ============================================================
	Error handler
   ============================================================ */

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
	const modules = gulp.src(`${config.assetsPath}/js/**/*.js`);

	return gulp.src([`${config.assetsPath}/js/app.js`])
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(bundler(modules))
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