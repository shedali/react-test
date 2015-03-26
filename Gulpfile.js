var gulp = require('gulp')

, sourcemaps = require('gulp-sourcemaps')

, browserify = require('browserify')

, reactify = require('reactify')

, source = require("vinyl-source-stream")

, watchify = require('watchify')

, open = require('gulp-open')

, uglify = require('gulp-uglify')

, connect = require('gulp-connect')

, browserSync = require('browser-sync')

, react = require('gulp-react');



gulp.task('react', function () {

    return gulp.src('*.jsx')

        .pipe(react())

        .pipe(gulp.dest('./'));

})



var reload = browserSync.reload;



gulp.task('parse-react', function () {

    var b = browserify();

    b.transform(reactify); // use the reactify transform

    b.add('./main.js');

    return b.bundle()

    .pipe(source('main.js'))

    .pipe(gulp.dest('./dist'))

    .pipe(reload({stream: true}))

    .pipe(connect.reload())

});



gulp.task('browser-sync', function() {

    browserSync({

        server: {

            baseDir: "./"

        }

    });

});



gulp.task('watch', function() {

  gulp.watch(['*.js', '*.jsx'], ['parse-react', 'react']);

});



gulp.task('webserver', function() {

  connect.server({

    livereload: true

  })

});



gulp.task('openurl', function(){

  var options = {

    url: 'http://127.0.0.1:8080',

    app: 'chrome'

  };

  gulp.src('./index.html')

  .pipe(open('', options));

});



gulp.task('default', ['parse-react', 'browser-sync', 'watch', 'openurl'])

gulp.task('am', ['parse-react', 'browser-sync', 'webserver', 'watch']);
