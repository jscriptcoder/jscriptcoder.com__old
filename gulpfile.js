var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function () {
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('css/'));
});

gulp.task('default', function () {
    gulp.watch('src/less/**/*.less', ['less']);
});