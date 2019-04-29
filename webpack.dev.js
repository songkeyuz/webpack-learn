//开发阶段的配置文件
const path = require('path');
//引入公共的配置
//安装： npm install --save-dev webpack-merge
const merge = require('webpack-merge');
const common = require('./webpack.common');

let devConfig = {
    mode: 'development',
    output: {
        filename: 'main[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map', //js报错位置显示  不要用于生产模式
    module: {
        rules: [{
            test: /\.(sc|sa|c)ss$/,
            // use: ['style-loader', 'css-loader', 'sass-loader']
            use: [
                'style-loader',
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
        }]
    },
};

module.exports = merge(common, devConfig); //默认2个参数  第一个是公共的   第二个是自己的  后面的会层叠前面的