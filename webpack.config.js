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
    // plugin:[
    //     new HtmlWebpackPlugin()
    // ],
};