var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    webpack = require("webpack"),
    clean = require('gulp-clean'),
    gutil = require("gulp-util");


gulp.task('webpack', function (callback) {
    webpack({
        context: __dirname,
        entry: './webpack_entry.js',
        output: {
            path: __dirname + "/build",
            filename: 'bundle.js'
        },
        node: {
            fs: "empty"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader?limit=10000&minetype=application/font-woff"
                }, {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                }, {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]',
                        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                }]

        },
        plugins: [
            new webpack.ProvidePlugin({
                'jQuery': 'jquery',
                'window.jQuery': 'jquery',
                'Tether': 'tether',
                'window.Tether': 'tether'
            })]

    }, function (err, stats) {

        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));

        callback();

    });
});

gulp.task("html", function () {
    gulp.src(["src/www/views/**//*"]).pipe(gulp.dest("build/views/"));
    gulp.src(["src/index.html"]).pipe(gulp.dest("build/"));
})

gulp.task("assets", function () {
    gulp.src(["src/www/assets/**//*"]).pipe(gulp.dest("build/assets/"));
})

gulp.task('clean', function () {
    return gulp.src('build/')
        .pipe(clean({ force: true }));
});


gulp.task("default", ["html", "assets", "webpack"], function () {

})



gulp.task('minify', function () {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});