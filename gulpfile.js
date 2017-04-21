var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create();

var sassDir = ['./sass/style.scss'],
    cssDir = ['./css/*.css'];

gulp.task('sass', function() {
    return gulp.src(sassDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('autoprefixer', function() {
    return gulp.src(cssDir)
        .pipe(postcss([autoprefixer({
            browsers: ['last 40 versions']
        })]))
        .pipe(gulp.dest('./css'))
        // .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch(['./sass/**/*.scss', './sass/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// gulp.task('watch', function() {
//     gulp.watch(['./sass/**/*.scss', './sass/*.scss'], ['sass']);
//     gulp.watch(['./css/*.css'], ['autoprefixer']);
// });

gulp.task('default', ['serve']);