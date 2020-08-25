const path = require('path');
const webpack = require('webpack');
const utils = require('../src/index');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    target: 'web',
    entry: utils.paths,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]/[name].js',
        library: '@sebgroup/frontend-tools',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new CopyWebpackPlugin({
            patterns: utils.indexes
        }),
        new CaseSensitivePathsPlugin()
    ],
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", exclude: [/node_modules/, /\.(test)\.ts$/] }
        ]
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false
    }
};
