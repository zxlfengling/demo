/**
 * Created by zxl on 2018/7/30.
 */

app.config(function($urlRouterProvider,$stateProvider){
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
            url: '/articleList?startAt&endAt&type&status&page&id',
            cache:false,
            templateUrl:'html/articleList.html',
        })
        .state("home.articleAdd", {
            url: '/articleAdd?id',
            templateUrl:'html/articleAdd.html'
        })
})