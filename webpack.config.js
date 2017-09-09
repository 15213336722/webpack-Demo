var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var glob = require('glob');

var getEntry = function () {
    var entry = {};
    glob.sync('./app/**/js/*.js').forEach(function (name) {
        var start = name.indexOf('js/')+3;
        var end = name.length-2;
        var n = name.slice(start,end);
        n = n.slice(0,n.indexOf('/js'));
        entry[n] = name;
    });
    return entry;
}



module.exports = {
    entry : getEntry(),
    output:{
        path:path.join(__dirname,'build/js'),
        filename:'[name].js'
    },
    devServer:{
        contentBase:'./app',
        inline:true,
        historyApiFallback:true,
        port:'3003'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack脚手架测试',
            template: __dirname+'/app/index.html',
            filename: path.join(__dirname,'build/[name].html'),
            showErrors: true,
            inject: 'body',
        })
    ]

};