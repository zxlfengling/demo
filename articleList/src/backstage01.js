/**
 * Created by zxl on 2018/7/24.
 */
var app=angular.module("myApp",[]);
app.controller('list',['$scope','$http',function($scope,$http){
    $http(
        {
            method:'GET',
            url:'/carrots-admin-ajax/a/article/search',
        }).then(function successCallback(data){
            console.log(data)
             $scope.list=data.data.data.articleList;
        }, function errorCallback(data) {
            // 请求失败执行代码
        }
    )
}])
