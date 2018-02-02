var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    reload = browserSync.reload,
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");


gulp.task('scripts', function () {

    return gulp.src([
        './libs/jquery/dist/jquery.min.js',
        './libs/angular/angular.js',
        './libs/tether/dist/js/tether.min.js',
        './libs/bootstrap/dist/js/bootstrap.min.js',
        './app/js/test.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(reload({stream: true}));

});

gulp.task('html', function () {
    gulp.src('./pages/index.html')
        .pipe(reload({stream: true}));
});

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: './',
            index: './pages/index.html'
        },
        notify: false
    });
});
//
// gulp.task('watch', function () {
//     gulp.watch("./pages/*.html", ['html']);
//     gulp.watch("./app/js/*.ts", ['scripts']);
// });
//
// gulp.task('coffeeWatch',['coffee'], function () {
//     gulp.watch('./app/js/coffee/*.coffee', ['coffee']);
// });


gulp.task("ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("js"));
});

gulp.task('watch', ['ts'], function () {
    gulp.watch('app/js/*.ts', ['ts']);
});

gulp.task('default', ['scripts', 'watch', 'sync']);