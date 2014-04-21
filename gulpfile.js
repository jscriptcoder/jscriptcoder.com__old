var gulp = require('gulp'),
    conn = require('gulp-connect'),
    less = require('gulp-less'),
    tsc = require('gulp-tsc');

gulp.task('conn', function () {
    conn.server();
});

gulp.task('less', function () {
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('build/css/'));
});

gulp.task('tsc', function () {
    gulp.src('src/ts/**/*.ts')
        .pipe(tsc({ module: 'amd', 'target': 'ES5' }))
        .pipe(gulp.dest('build/js/'))
});

gulp.task('default', function () {
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/ts/**/*.ts', ['tsc']);
});