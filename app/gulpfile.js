var pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  rimraf = require('gulp-rimraf'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  browserify = require('gulp-browserify'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  through = require('through'),
  opn = require('opn'),
  ghpages = require('gh-pages'),
  del = require('del'),
  path = require('path'),
  isDist = process.argv.indexOf('serve') === -1;

var dist = '../';

var dest = {
  root: dist,
  js: dist + 'js',
  css: dist + 'css',
  images: dist + 'images'
};

gulp.task('js', ['clean:js'], function() {
  return gulp.src('src/scripts/main.js')
    .pipe(isDist ? through() : plumber())
    .pipe(browserify({transform: ['debowerify'], debug: !isDist}))
    .pipe(isDist ? uglify() : through())
    .pipe(rename('app.js'))
    .pipe(gulp.dest(dest.js))
    .pipe(connect.reload());
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src('src/index.jade')
    .pipe(isDist ? through() : plumber())
    .pipe(jade({pretty: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(dest.root))
    .pipe(connect.reload());
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src('src/styles/main.styl')
    .pipe(isDist ? through() : plumber())
    .pipe(stylus({
      // Allow CSS to be imported from node_modules and bower_components
      'include css': true,
      'paths': ['./node_modules', './bower_components']
    }))
    .pipe(autoprefixer('last 2 versions', {map: false}))
    .pipe(isDist ? csso() : through())
    .pipe(rename('app.css'))
    .pipe(gulp.dest(dest.css))
    .pipe(connect.reload());
});

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest(dest.images))
    .pipe(connect.reload());
});

gulp.task('examples', ['clean:examples'], function() {
  return gulp.src('src/examples/**/*')
    .pipe(gulp.dest('dist/examples'))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(rimraf());
});

gulp.task('clean:html', function(cb) {
  del([dest.root + '/index.html'], {force: true}, cb);
});

gulp.task('clean:js', function(cb) {
  del([dest.js + '/**/*.js'], {force: true}, cb);
});

gulp.task('clean:css', function(cb) {
  del([dest.css + '/**/*.css'], {force: true}, cb);
});

gulp.task('clean:images', function(cb) {
  del([dest.images + '/**/*.png'], {force: true}, cb);
});

gulp.task('clean:examples', function() {
  return gulp.src('dist/examples')
    .pipe(rimraf());
});

gulp.task('connect', ['build'], function(done) {
  connect.server({
    root: dest.root,
    livereload: true
  });

  opn('http://localhost:8080', done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/styles/**/*.styl', ['css']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/examples/**/*', ['examples']);
  gulp.watch([
    'src/scripts/**/*.js',
    'bespoke-theme-*/dist/*.js' // Allow themes to be developed in parallel
  ], ['js']);
});

gulp.task('deploy', ['build'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), {logger: gutil.log}, done);
});

gulp.task('build', ['js', 'html', 'css', 'images']);
gulp.task('serve', ['connect', 'watch']);
gulp.task('default', ['build']);
