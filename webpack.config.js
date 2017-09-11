var HtmlWebpackPlugin = require('html-webpack-plugin');  //页面生成插件 （HTML，包括应用的js）
var _ = require('lodash');

var path = require('path'); //webpack 内置包
var glob = require('glob'); //webpack 内直包（提供文件遍历）

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

var getPlugins = function () {
    var htmlObject = {};
    var arr = [];
    glob.sync('./app/**/template/*.html').forEach(function (name) {
        var start = name.indexOf('template/')+9;
        var end = name.length-5;
        var n = name.slice(start,end);
        htmlObject[n] = name
    });
    _.forEach(htmlObject,function (n,key) {
        var obj = new HtmlWebpackPlugin({
            template: path.join(__dirname,n),
            filename: path.join(__dirname,'build/'+key+'.html'),
            chunks:[key],
            hash:true
        });
        arr.push(obj);
    });
    var index = new HtmlWebpackPlugin({
        template: path.join(__dirname,'/app/index.html'),
        filename: path.join(__dirname,'build/index.html'),
        chunks:['index'],
        hash:true
    });
    arr.push(index);
    return arr;
}

module.exports = {
    entry : getEntry(),
    output:{
        path:path.join(__dirname,'build/js'),
        filename:'[name].js'
    },
    watch:true,
    devServer:{
        contentBase:'./build',
        inline:true,
        historyApiFallback:true,
        port:'3003'
    },
    plugins:getPlugins(),
    module:{
        rules:[
            {
                test:/\.css|.less$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            }
        ]
    }
};