//公共的配置文件（有些时候开发dev和生产prod有一些相同的配置，所以就创建一个公共的配置文件）
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            //添加图片处理
            {
                //安装插件：npm install --save-dev file-loader
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000 //数值不能太大
                        }
                    },
                    //只是初步处理  要压缩优化还要进行下一步
                    //安装：npm install image-webpack-loader --save-dev
                    {
                        //进一步优化成base64
                        //安装插件: npm install --save-dev url-loader
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            //将js文件转换成base64格式
            //安装插件：npm i -D babel-loader babel-core babel-preset-env
            {
                test: /\.js$/,
                exclude: /(node_modules)/, //加快编译速度，不包含node_modules文件夹内容
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'sky', //默认值：webpack App
            filename: 'main.html', //默认值：'index.html'
            template: path.resolve(__dirname, 'src/main.html'),
            minify: {
                collapseWhitespace: true, //是否去除空白
                removeComments: true, //是否移除注释
                removeAttributeQuotes: true //移除属性的引号
            }
        }),
        //清理插件，配置
        new CleanWebpackPlugin(), //设置清除的目录名 默认dist
    ]
}