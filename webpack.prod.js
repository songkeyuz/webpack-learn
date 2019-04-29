//生产阶段的配置文件
const path = require('path');
//webpack4开始使用mini-css-extract-plugin插件将样式表抽离成专门的单独文件
// npm install --save-dev mini-css-extract-plugin
//引入模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将mode换成production

//压缩css插件：npm i -D optimize-css-assets-webpack-plugin
//引入
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//压缩JS ：npm i -D uglifyjs-webpack-plugin
//引入
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//解决CSS文件或者JS文件名字哈希变化的问题
//插件： npm install --save-dev html-webpack-plugin 可以把打包好的文件直接注入HTML中
//引入
const HtmlWebpackPlugin = require('html-webpack-plugin');

//清理目录插件 ：npm install clean-webpack-plugin --save-dev
//引入
const CleanWebpackPlugin = require('clean-webpack-plugin');

//引入公共配置 
const merge = require('webpack-merge');
const common = require('./webpack.common');


let prodConfig = {
    mode: 'production',
    output: {
        filename: 'main[hash]. js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.(sc|sa|c)ss$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', //添加sourceMap查看路径
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['> 0.15% in CN'] })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash].css', //设置最终输出的文件名
            chunkFilename: '[id][hash].css'
        })
    ],
    //设置压缩
    optimization: {
        minimizer: [
            //css压缩
            new OptimizeCSSAssetsPlugin({}),
            //js压缩
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    }
};

module.exports = merge(common, prodConfig);