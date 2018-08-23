/**
 * Created by zxl on 2018/7/18.
 */
var app=angular.module("myApp",['ui.router','angularFileUpload']);
//依赖模块就是依赖模块里面的功能
//var angular=new xx();
//模块是唯一的，重复定义就会覆盖前面的模块
//对业务进行划分，根据不同的功能划分不同的模块
//参数myApp是模块名称；
//数组表示依赖的模块，如果没有依赖就写空数组
//我们需要给ng-app指令一个属性值，这个值就是我们创建的模块名:
//告诉anuglar,现在由我们自己创建的这个模块来管理页面。
//减少全局污染，