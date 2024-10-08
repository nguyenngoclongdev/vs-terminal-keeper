/* eslint-disable @typescript-eslint/naming-convention */
'use strict';
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');
const terserPlugin = require('terser-webpack-plugin');

/** @type WebpackConfig */
const webExtensionConfig = {
    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    target: 'webworker', // extensions run in a webworker context
    entry: {
        extension: './src/extension.ts' // source of the web extension main file
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist/web'),
        libraryTarget: 'commonjs'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new terserPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
        extensions: ['.ts', '.js'], // support ts-files and js-files
        alias: {
            // provides alternate implementation for node module and source files
        },
        fallback: {
            // Webpack 5 no longer polyfills Node.js core modules automatically.
            // see https://webpack.js.org/configuration/resolve/#resolvefallback
            // for the list of Node.js core module polyfills.
            assert: require.resolve('assert'),
            path: require.resolve('path-browserify'),
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer'),
            stream: require.resolve('stream-browserify'),
            os: require.resolve('os-browserify/browser'),
            constants: require.resolve("constants-browserify"),
            timers: require.resolve('timers-browserify'),
            child_process: false,
            fs: false,
            url: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser' // provide a shim for the global `process` variable
        })
    ],
    externals: {
        vscode: 'commonjs vscode' // ignored because it doesn't exist
    },
    performance: {
        hints: false
    },
    devtool: 'nosources-source-map' // create a source map that points to the original source file
};

module.exports = [webExtensionConfig];
