/*jshint esversion: 6 */

const babelify  = require('babelify'),
	browserSync = require('browser-sync'),
	browserify  = require('browserify'),
	buffer      = require('vinyl-buffer'),
	bundler     = require('gulp-es6-module-bundler'),
	clean       = require('gulp-clean'),
	gulp        = require('gulp'),
	gulpif      = require('gulp-if'),
	gutil       = require('gulp-util'),
	image       = require('gulp-image'),
	less        = require('gulp-less'),
	plumber     = require('gulp-plumber'),
	sequence    = require('run-sequence'),
	source      = require('vinyl-source-stream'),
	sourcemaps  = require('gulp-sourcemaps'),
	watch       = require('gulp-watch'),
	watchify    = require('watchify');

/* ============================================================
	Main tasks
   ============================================================ */

gulp.task('default', ['watch', 'browser-sync']);
gulp.task('build', () => {
	sequence(['clean', 'disable-debug'], ['less', 'watchify', 'fonts', 'images']);
});

gulp.task('clean', () => {
	return gulp.src(config.distPath, {read: false})
		.pipe(clean());
});

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

gulp.task('watch', ['watch:html', 'watch:js', 'watch:less']);

gulp.task('watch:less', ['less'], () => {
	return gulp.watch(config.assetsPath + '/styles/**/*.less', ['less']);
});

gulp.task('watch:js', ['watchify'], () => {
	return gulp.watch([`${config.assetsPath}/js/*.js`, `${config.assetsPath}/js/**/*.js`], ['watchify']);
});

gulp.task('watch:html', () => {
	return gulp.watch(['*.html']).on('change', browserSync.reload);
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

gulp.task('watchify', function () {
	const props = {
		entries: [config.assetsPath + '/js/app.js'],
		debug: config.debug,
		cache: {},
		packageCache: {},
	};

	const bundler = config.debug ? watchify(browserify(props)) : browserify(props);
		bundler.transform(babelify, {presets: ["es2015-without-strict"]});

	function rebundle() {
		const stream = bundler.bundle();
		return stream.on('error', handleError)
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({
				loadMaps: config.debug
			}))
			.pipe(gulpif(config.debug, sourcemaps.write('./')))
			.pipe(gulp.dest(config.distPath + '/js/'))
			.pipe(browserSync.stream());
	}

	bundler.on('update', function() {
		rebundle();
		gutil.log('Rebundle...');
	});

	return rebundle();
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
	Fonts
   ============================================================ */

gulp.task('fonts', () => {
	gulp.src(`${config.assetsPath}/fonts/**`)
		.pipe(gulp.dest(config.distPath + '/fonts'));
});

/* ============================================================
	Image compression
   ============================================================ */

gulp.task('images', () => {
  gulp.src(`${config.assetsPath}/img/**/*`)
	.pipe(image())
	.pipe(gulp.dest(`${config.distPath}/img`));
});