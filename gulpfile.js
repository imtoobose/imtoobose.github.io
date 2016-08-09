var 
  gulp         = require('gulp'),
  sass         = require('gulp-sass'),
  uglify       = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  changed      = require('gulp-changed'),
  babel        = require('gulp-babel'),
  livereload   = require('gulp-livereload');

livereload({
  port: '8080',
  start: true
  });

gulp.task('sass', function(){
  gulp.src('dev/*.scss')
  .pipe(changed('dist'))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('uglify', function(){
  gulp.src('dev/*.js')
  .pipe(changed('dist'))
  .pipe(babel({
    presets: ['es2015']
    })).on('end', ()=> console.log('done'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('default', function(){
  livereload.listen();
  gulp.watch('dev/*.scss', ['sass']);
  gulp.watch('dev/*.js', ['uglify']);
});