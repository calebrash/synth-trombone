var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    less = require('gulp-less');

gulp.task('js', function () {
    browserify({ entries: ['src/tone.js', 'src/app.js'] })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('less', function () {
    return gulp.src('src/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'less']);

gulp.task('watch', function () {
    gulp.watch('src/*', ['default']);
});
