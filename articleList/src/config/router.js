/**
 * Created by zxl on 2018/7/30.
 */

//什么是ui-view?是一个组件，状态机制接口
//模版都在ui-view
/*如何使用$stateProvider.state(stateName, stateConfig)
 $config表示路由方法，$stateProvider表示提供的服务
 stateConfig是一个object对象，可以设置url、templateUrl、controller等属性
 login、home、home.articleList都是状态
 就是给定三种状态
*/
app.config(function($urlRouterProvider,$stateProvider){
    //路由重定向
    //config是用来对路由的配置，config是angular模块下的一个方法
    //$stateProvider 是提供的一个方法，用这个方法去配置路由，把状态都配置好
    //状态1、login表示状态的名字，url表示传递的表示路径

    //和ngRoute的otherwise()函数相似，在用户提交的路径没有被定义的时候它将重定向到指定的页面。
    //这是个创建’默认‘路径的好方法。 otherwise()只接受一个参数，
    //要么函数要么字符串，字符串必须为合法的url路由地址，
    //函数则会在没有任何路径被匹配的时候被运行。
    $urlRouterProvider.when("", "/login");//$urlRouterProvider.wen路径重定向
    $stateProvider
        .state("login", {
            url: '/login',//当用户浏览到/login时，出现html/login.html这个页面
            templateUrl:'html/login.html'//表示我页面的地址
        })
        .state("home", {
            url: '/home',
            templateUrl:'html/home.html'
        })
        .state("home.articleList", {
            url: '/articleList?startAt&endAt&type&status&page&id',
            templateUrl:'html/articleList.html',
            //controller:"articleList"
        })
        .state("home.articleAdd", {
            url: '/articleAdd?id',
            templateUrl:'html/articleAdd.html'
        })
})