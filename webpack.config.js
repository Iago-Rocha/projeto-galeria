const path = require('path')
const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: './build',
        port: 9000,
    },
    
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },

    devtool: "eval-cheap-source-map",
    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '/src/index.html'
        }),
        new MiniCssExtractPlugin({ filename: 'estilo.css' }),
        new CopyWebpackPlugin({

            patterns:[
            { context: 'src', from: 'imgs/**'},
            { context:'src', from: 'pages/**'}]}
        )
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', // interpreta @import, url()...
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader']
        },
        {
            test: /\.css$/i,
            use: ['style-loader',
            'css-loader']
        }]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true
            }),
            new CssMinimizerPlugin({})
        ]
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}