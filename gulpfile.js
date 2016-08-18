var 
  gulp         = require('gulp'),
  sass         = require('gulp-sass'),
  uglify       = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  changed      = require('gulp-changed'),
  babel        = require('gulp-babel'),
  pug          = require('gulp-pug'),
  uglifycss    = require('gulp-clean-css'),
  source       = require('vinyl-source-stream'),
  streamify    = require('gulp-streamify'),
  browserify   = require('browserify'),
  browserSync  = require('browser-sync').create();


gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("dev/*.scss", ['sass']);
    gulp.watch("dev/**/*.js", ['uglify']);
    gulp.watch("dev/*.pug", ['pug']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', function(){
  gulp.src('dev/*.scss')
  .pipe(changed('dist'))
  .pipe(sass()).on('error', sass.logError)
  .pipe(autoprefixer())
  .pipe(uglifycss())
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

gulp.task('uglify', function(){
  browserify('./dev/script.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(streamify(babel({
    presets: ['es2015']
    }))).on('end', ()=> console.log('done'))
  .on('error', (e)=> console.log(e))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('dist')).on('end', ()=> console.log('minified and compiled js'))
  .pipe(browserSync.stream());
});

gulp.task('pug', function(){
  gulp.src('dev/*.pug')
  .pipe(changed('dist'))
  .pipe(pug({
    "pretty": true
    }))
  .on('error', (e)=> console.log(e))
  .pipe(gulp.dest('./'))
});

gulp.task('default', ['serve']);