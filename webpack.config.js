const path = require('path');
const webpack = require('webpack');
const utils = require('./src/index');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    target: 'web',
    entry: utils.paths,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'frontend-tools',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    externals: {
        "moment": {
            commonjs: "moment",
            commonjs2: "moment"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new CaseSensitivePathsPlugin()
    ],
    module: {},
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false
    }
};
