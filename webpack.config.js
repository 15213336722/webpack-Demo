var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : __dirname+'/app/index/js/index.js',
    output:{
        path:__dirname+'/build/js',
        filename:'index.js'
    },
    devServer:{
        contentBase:'./build',
        inline:true,
        historyApiFallback:true,
        port:'3003'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack脚手架测试',
            template: __dirname+'/app/index/template/index.html',
            filename: __dirname+'/build/template/index.html',
            showErrors: true,
            inject: 'body',
        })
    ]
};