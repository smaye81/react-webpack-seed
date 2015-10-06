var gulp = require('gulp');
var gutil = require('gulp-util');
var assign = require('object-assign');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config");

function buildWebpack(config) {
    return webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack bundle', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false
        }));
    });
}

gulp.task('webpack', function() {
    buildWebpack(webpackConfig);
});

/**
 * Watch task if not using webpack-dev-server
 */
gulp.task('webpack-watch', function() {
    var customConfig = assign({}, webpackConfig);
    customConfig.watch = true;
    customConfig.devtool = 'source-map';
    buildWebpack(customConfig);
});


gulp.task("wds", function(callback) {
    var customConfig = assign({}, webpackConfig);

    customConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // Start a webpack-dev-server
    var compiler = webpack(customConfig);

    new WebpackDevServer(compiler, {
        inline : true,
        stats: {
            colors: true
        }
    }).listen(8081, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            // Server listening
            gutil.log("[webpack-dev-server]", "Listening at http://localhost:8081/webpack-dev-server/app");
        });
});

gulp.task('default', ['webpack-watch', 'wds']);
