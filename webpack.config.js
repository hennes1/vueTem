// 专门处理路径用的，以当前路径解析出一个绝对路径
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: "./src/main.js", // 打包入口文件，webpack会自动查找相关的依赖进行打包
    output: {
        filename: "bundle.js", // 打包后的名字
        path: path.resolve('./dist') //打包后的地址，必须是一个绝对路径
    },
    module: {
        rules: [
            {test: /\.js$/, use: "babel-loader", exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(jpg|jpeg|gif|png)/, use: 'url-loader?limit=8092'},
            {test: /\.vue$/, use: "vue-loader"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: true
        }),
        new VueLoaderPlugin()
    ]
};
