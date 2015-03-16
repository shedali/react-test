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
});

gulp.task('url', function(){
  var options = {
    url: 'http://127.0.0.1:8080',
    app: 'chrome'
  };
  gulp.src('./index.html')
  .pipe(open('', options));
});

gulp.task('default', ['webserver', 'watch', 'url'])