// 引入包
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 入口文件
    entry: './src/index.ts',
    // 打包文件所在目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 告诉 webpack 打包不使用箭头函数
        environment: {
            arrowFunction: false,
            const:false
        },
    },
    // 打包时所用模块
    module: {
        rules: [
            {
                // 规则生效的文件
                test: /\.ts$/,
                // 要使用的 loader
                use: [
                    // 配置 babel
                    {
                        // 指定 loader
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 兼容的浏览器
                                        targets: {
                                            chrome: '88',
                                            ie: '8',
                                        },
                                        // 指定 corejs 版本
                                        corejs: '3',
                                        // 使用 corejs 方式
                                        // usage 表示按需加载
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                    'ts-loader',
                ],
                // 要排除编译的文件
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入 postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions',
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },
    // 打包时所用插件
    plugins: [
        new HtmlWebpackPlugin({
            // title:'自定义属性内容',
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    // 设置引用模块
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'production',
}
