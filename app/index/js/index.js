require('../../index/css/index.less');
require('angular');

var app = angular.module('myApp', []);
app.controller('myCtrl',function ($scope) {
    $scope.arr = ['name1','name2','name3','name4','name5'];

});
