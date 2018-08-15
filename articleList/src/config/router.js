/**
 * Created by zxl on 2018/7/30.
 */
app.config(function($urlRouterProvider,$stateProvider){
    //路由重定向
    $urlRouterProvider.when("", "/login");
    $stateProvider
        .state("login", {
            url: '/login',
            templateUrl:'html/login.html'
        })
        .state("home", {
            url: '/home',
            templateUrl:'html/home.html'
        })
        .state("home.articleList", {
            url: '/articleList?startAt&endAt&type&status&page',
            templateUrl:'html/articleList.html',
            //controller:"articleList"
        })
        .state("home.articleAdd", {
            url: '/home.articleAdd',
            templateUrl:'html/articleAdd.html'
        })
})