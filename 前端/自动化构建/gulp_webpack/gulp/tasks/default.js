// 并行执行sprites，images，views，webpack任务
gulp.task('default', [
    'sprites',
    'images',
    'views',
    'webpack'
]);

// 并行执行clean:sprites，clean:views，clean:webpack
gulp.task('clean', [
    'clean:sprites',
    'clean:views',
    'clean:webpack'
]);