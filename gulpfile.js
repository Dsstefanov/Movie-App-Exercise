let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')
let htmlmin = require('gulp-htmlmin')
let jsmin = require('gulp-minify')

gulp.task('minify-css', () => {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
})
gulp.task('minify-html', () => {
    return gulp.src('./views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/html'));
})
gulp.task('minify-js', () => {
    return gulp.src('./handlers/*.js')
        .pipe(jsmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./handlers-minified'));
})

gulp.task('default', ['minify-css', 'minify-html', 'minify-js'])