var WebpackNotifierPlugin = require('webpack-notifier');

var appConfig = {
    WEBPACK_ENTRY : ['./app/app.js'],
    BUNDLE_NAME : {
        APP : './app/bundle.js'
    }
};

module.exports = {
    entry: {
        'app': appConfig.WEBPACK_ENTRY
    },
    output: {
        path: __dirname,
        filename: appConfig.BUNDLE_NAME.APP
    },
    plugins : [
        new WebpackNotifierPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    eslint: {
        configFile: './.eslintrc'
    }
};
