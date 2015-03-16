var gulp = require('gulp')
, sourcemaps = require('gulp-sourcemaps')
, browserify = require('browserify')
, reactify = require('reactify')
, source = require("vinyl-source-stream")
, watchify = require('watchify')
, open = require('gulp-open')
, uglify = require('gulp-uglify')
, connect = require('gulp-connect')

gulp.task('parse-react', function () {
	 var b = browserify();
  	b.transform(reactify); // use the reactify transform
  	b.add('./main.js');
  	return b.bundle()
    .pipe(source('main.js'))
    .pipe(uglify({compress: {} }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
  gulp.watch(['main.js', 'template.jsx'], ['parse-react']);
});


gulp.task('webserver', function() {
  connect.server({
    livereload: true
  })

  gulp.src('/index.html')
  .pipe(open('http://127.0.0.1:8080'))
});

gulp.task('default', ['webserver', 'watch'])