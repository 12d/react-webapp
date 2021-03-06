/**
 * @author xuweichen@meitu.io
 * @date 2017/8/22
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.server.js'
    ],
    target: 'node',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:4].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            //JS和JSX加载
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /(node_modules|bower_components)/
            },
            //css加载
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ],
            //     include: path.resolve('./src')
            // },
            //图片文件加载
            {
                test: /\.png|jpe?g|gif|svg(\?.*)?/,
                use: {
                    loader:  "url-loader",//引用图片的格式,通过query来指定
                    query: {
                        name: 'img/[name].[hash:4].[ext]',
                        limit: 1000 //小于这个则会通过dataURI引用
                    }
                },
                include: path.resolve('./src')
            },
            //音频视频文件加载
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'media/[name].[hash:4].[ext]'
                    }
                }
            },
            //字体加载
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[hash:4].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
    ],

    devServer: {
        hot: true, //打开 HMR
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};