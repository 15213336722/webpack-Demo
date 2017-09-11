var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');

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
    glob.sync('./app/**/template/*.html').forEach(function (name) {;
        var start = name.indexOf('template/')+9;
        var end = name.length-5;
        var n = name.slice(start,end);
        htmlObject[n] = name
    });
    _.forEach(htmlObject,function (n,key) {
        var obj = new HtmlWebpackPlugin({
            template: path.join(__dirname,n),
            filename: path.join(__dirname,'build/'+key+'.html'),
            chunks:[key]
        });
        arr.push(obj);
    });
    return arr;
}

getPlugins();


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
    plugins:getPlugins()
};