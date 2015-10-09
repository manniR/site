var gulp = require('gulp'),
	jade = require('gulp-jade'),
	browserify = require('browserify'),
	concat = require('gulp-concat-sourcemap'),
	streamify = require('gulp-streamify'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	gulpif = require('gulp-if'),
 	compass = require('gulp-compass'),
  	minifyCSS = require('gulp-minify-css'),
  	utf8 = require('to-utf-8'),
  	sourcemaps = require('gulp-sourcemaps'),
  	gutil = require('gulp-util'),
  	buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');

var	env = process.env.NODE_ENV || 'development';
var	outputDir = './builds/development';


gulp.task('jade', function(){
	return gulp.src('src/templates/**/*.jade')
	.pipe(jade({ pretty: true })) //without any arguments -> minifyed output
	.pipe(gulp.dest(outputDir));
});
gulp.task('js', function() {
	return browserify({
				entries:'src/js/main.js',
				debug:true //
			})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer()) //
		.pipe(sourcemaps.init({loadMaps: true})) //
		//.pipe(streamify(uglify())//
			.pipe(uglify()) //
			.on('error', gutil.log) //
			.pipe(sourcemaps.write('./')) //
		.pipe(gulp.dest(outputDir + '/js'));
});	

gulp.task('jsp', function() {
	return browserify('src/js/main.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(outputDir + '/js'));
	});


gulp.task('libs', function() {
     // .pipe(streamify(uglify()))
   gulp.src(['src/js/vendor/jquery-1.11.3.min.js','src/js/vendor/jquery.stellar.js', 'src/js/vendor/motio.min.js',])
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(outputDir + '/js'));
});

gulp.task('sass', function() {
	var config = {};

	if ( env === 'development') {
		config.sourceComments = 'map';
	}
	
	if ( env === 'production') {
		config.outputStyle = 'compressed';
	}

	return gulp.src('src/sass/main.scss')
	.pipe(sass(config))
	.pipe(gulp.dest(outputDir + '/css'));
});

gulp.task('compass', function() {
  gulp.src('./src/sass/main.scss')
    .pipe(compass({
      css: outputDir + '/css',
      sass: 'src/sass',
      image: outputDir + '/img',
      require: ['susy', 'breakpoint']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(outputDir + '/css'));
});



gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: outputDir,
		},
			notify: false //disable "ConnectedToBrowserSync" Message in BrowserWindow
		});
});

//gulp.task('default', ['connect', 'jade', 'compass', 'js', 'watch']);

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('watch', function() {
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/sass/**/*.scss', ['compass']);
	gulp.watch("builds/**/*.*").on('change', browserSync.reload); // watch for any changes in src directory
	// gulp.watch('src/sass/**/*.scss', ['sass']);
});

