const webpack = require("webpack");
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/
            },
            {
                test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    plugins: [HtmlWebpackPluginConfig]

}